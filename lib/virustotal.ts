import crypto from "crypto";
import * as fs from "fs/promises";
import prisma from "@/lib/prisma";

type VirusTotalStats = {
  harmless?: number;
  malicious?: number;
  suspicious?: number;
  undetected?: number;
  timeout?: number;
};

export type VirusTotalScanResult =
  | { status: "clean"; hash: string; stats?: VirusTotalStats }
  | { status: "malicious"; hash: string; stats?: VirusTotalStats }
  | { status: "unknown"; hash: string; reason: string }
  | { status: "skipped"; reason: string };

const VT_BASE_URL = "https://www.virustotal.com/api/v3";
const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_POLL_MS = 2_000;
const DEFAULT_MAX_POLLS = 20;

let scanQueue = Promise.resolve();

function getApiKey() {
  return process.env.VIRUSTOTAL_API_KEY || "";
}

function isScanRequired() {
  return process.env.VIRUSTOTAL_REQUIRED === "true";
}

function getTimeoutMs() {
  return Number(process.env.VIRUSTOTAL_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
}

function getPollMs() {
  return Number(process.env.VIRUSTOTAL_POLL_MS) || DEFAULT_POLL_MS;
}

function getMaxPolls() {
  return Number(process.env.VIRUSTOTAL_MAX_POLLS) || DEFAULT_MAX_POLLS;
}

function isMalicious(stats?: VirusTotalStats) {
  if (!stats) return false;
  return (stats.malicious ?? 0) > 0 || (stats.suspicious ?? 0) > 0;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(
  url: string,
  options: RequestInit,
  timeoutMs: number
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const text = await res.text();
    const json = text ? JSON.parse(text) : null;
    return { res, json };
  } finally {
    clearTimeout(timer);
  }
}

async function getFileReport(hash: string, apiKey: string) {
  const { res, json } = await fetchJson(
    `${VT_BASE_URL}/files/${hash}`,
    { headers: { "x-apikey": apiKey } },
    getTimeoutMs()
  );

  if (res.status === 404) {
    return { status: "not_found" as const };
  }

  if (!res.ok) {
    return { status: "error" as const, message: `status ${res.status}` };
  }

  const stats = json?.data?.attributes?.last_analysis_stats as
    | VirusTotalStats
    | undefined;
  return { status: "found" as const, stats };
}

async function submitFile(buffer: Buffer, filename: string, apiKey: string) {
  const form = new FormData();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  form.append("file", blob, filename || "upload.bin");

  const { res, json } = await fetchJson(
    `${VT_BASE_URL}/files`,
    { method: "POST", headers: { "x-apikey": apiKey }, body: form },
    getTimeoutMs()
  );

  if (!res.ok) {
    return { status: "error" as const, message: `status ${res.status}` };
  }

  const id = json?.data?.id;
  if (!id) {
    return { status: "error" as const, message: "missing analysis id" };
  }

  return { status: "ok" as const, id: String(id) };
}

async function pollAnalysis(id: string, apiKey: string) {
  const timeoutMs = getTimeoutMs();
  for (let i = 0; i < getMaxPolls(); i += 1) {
    await sleep(getPollMs());
    const { res, json } = await fetchJson(
      `${VT_BASE_URL}/analyses/${id}`,
      { headers: { "x-apikey": apiKey } },
      timeoutMs
    );

    if (!res.ok) continue;
    const status = json?.data?.attributes?.status;
    if (status !== "completed") continue;

    const stats = (json?.data?.attributes?.stats ||
      json?.data?.attributes?.last_analysis_stats) as
      | VirusTotalStats
      | undefined;
    return { status: "completed" as const, stats };
  }

  return { status: "timeout" as const };
}

export async function scanBufferWithVirusTotal(
  buffer: Buffer,
  filename: string
): Promise<VirusTotalScanResult> {
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  const apiKey = getApiKey();
  if (!apiKey) {
    return { status: "skipped", reason: "VIRUSTOTAL_API_KEY not set" };
  }
  const report = await getFileReport(hash, apiKey);

  if (report.status === "found") {
    if (isMalicious(report.stats)) {
      return { status: "malicious", hash, stats: report.stats };
    }
    return { status: "clean", hash, stats: report.stats };
  }

  if (report.status === "error") {
    return { status: "unknown", hash, reason: report.message };
  }

  const submission = await submitFile(buffer, filename, apiKey);
  if (submission.status === "error") {
    return { status: "unknown", hash, reason: submission.message };
  }

  const analysis = await pollAnalysis(submission.id, apiKey);
  if (analysis.status !== "completed") {
    return { status: "unknown", hash, reason: "analysis timeout" };
  }

  if (isMalicious(analysis.stats)) {
    return { status: "malicious", hash, stats: analysis.stats };
  }

  return { status: "clean", hash, stats: analysis.stats };
}

async function runVirusTotalScanForMedia({
  mediaId,
  filename,
  buffer,
  storedPath,
}: {
  mediaId: number;
  filename: string;
  buffer: Buffer;
  storedPath?: string;
}) {
  try {
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    const cached = await prisma.media.findFirst({
      where: {
        scanHash: hash,
        scanStatus: { in: ["CLEAN", "MALICIOUS"] },
      },
      select: { scanStatus: true, scanMessage: true },
    });
    const scannedAt = new Date();

    if (cached?.scanStatus === "CLEAN") {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          isVisibility: "AVAILABLE",
          isAccessible: "PRIVATE",
          scanStatus: "CLEAN",
          scanMessage: cached.scanMessage ?? null,
          scanHash: hash,
          scannedAt,
        },
      });
      return;
    }

    if (cached?.scanStatus === "MALICIOUS") {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          isVisibility: "REMOVE",
          isAccessible: "RESTRICTED",
          scanStatus: "MALICIOUS",
          scanMessage: cached.scanMessage ?? "Virus scan flagged this file.",
          scanHash: hash,
          scannedAt,
        },
      });
      if (storedPath) {
        await fs.rm(storedPath, { force: true }).catch(() => {});
      }
      return;
    }

    const result = await scanBufferWithVirusTotal(buffer, filename);
    const treatSkippedAsClean =
      result.status === "skipped" && !isScanRequired();
    const finalHash = "hash" in result ? result.hash : hash;

    if (result.status === "clean" || treatSkippedAsClean) {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          isVisibility: "AVAILABLE",
          isAccessible: "PRIVATE",
          scanStatus: "CLEAN",
          scanMessage: null,
          scanHash: finalHash,
          scannedAt,
        },
      });
      return;
    }

    if (result.status === "malicious") {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          isVisibility: "REMOVE",
          isAccessible: "RESTRICTED",
          scanStatus: "MALICIOUS",
          scanMessage: "Virus scan flagged this file.",
          scanHash: finalHash,
          scannedAt,
        },
      });
      if (storedPath) {
        await fs.rm(storedPath, { force: true }).catch(() => {});
      }
      return;
    }

    if (result.status === "unknown" || result.status === "skipped") {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          scanStatus: "FAILED",
          scanMessage: result.reason,
          scanHash: finalHash,
          scannedAt,
        },
      });
      console.warn("Virus scan incomplete for media", {
        mediaId,
        reason: result.reason,
      });
    }
  } catch (error) {
    console.error("Virus scan failed:", error);
  }
}

export function queueVirusTotalScanForMedia({
  mediaId,
  filename,
  buffer,
  storedPath,
}: {
  mediaId: number;
  filename: string;
  buffer: Buffer;
  storedPath?: string;
}) {
  scanQueue = scanQueue
    .then(() =>
      runVirusTotalScanForMedia({
        mediaId,
        filename,
        buffer,
        storedPath,
      })
    )
    .catch((error) => {
      console.error("Virus scan failed:", error);
    });
}
