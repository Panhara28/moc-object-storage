import crypto from "crypto";
import * as fs from "fs/promises";
import prisma from "@/lib/prisma";
import { logAudit } from "@/lib/audit";

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
  | { status: "skipped"; hash: string; reason: string };

const VT_BASE_URL = "https://www.virustotal.com/api/v3";
const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_POLL_MS = 2_000;
const DEFAULT_MAX_POLLS = 20;
const DEFAULT_JOB_LOCK_TIMEOUT_MS = 10 * 60 * 1000;
const DEFAULT_JOB_RETRY_DELAY_MS = 60 * 1000;
const DEFAULT_MAX_JOB_ATTEMPTS = 3;

const prismaAny = prisma as typeof prisma & {
  mediaScanJob: {
    create: (args: unknown) => Promise<unknown>;
    findFirst: (args: unknown) => Promise<MediaScanJobRecord | null>;
    updateMany: (args: unknown) => Promise<{ count: number }>;
    update: (args: unknown) => Promise<unknown>;
  };
};

type MediaScanJobStatus = "PENDING" | "PROCESSING" | "DONE" | "FAILED";

type MediaScanJobRecord = {
  id: number;
  mediaId: number;
  filename: string;
  storedPath: string;
  status: MediaScanJobStatus;
  attempts: number;
  lockedAt: Date | null;
  runAt: Date;
};

function hasMediaScanJobDelegate() {
  return Boolean(
    prismaAny.mediaScanJob &&
      typeof prismaAny.mediaScanJob.findFirst === "function"
  );
}

async function enqueueScanJob(data: {
  mediaId: number;
  filename: string;
  storedPath: string;
  runAt: Date;
}) {
  if (hasMediaScanJobDelegate()) {
    return prismaAny.mediaScanJob.create({
      data: {
        mediaId: data.mediaId,
        filename: data.filename,
        storedPath: data.storedPath,
        status: "PENDING",
        runAt: data.runAt,
      },
    });
  }

  return prisma.$executeRaw`
    INSERT INTO \`media_scan_jobs\`
      (\`mediaId\`, \`filename\`, \`storedPath\`, \`status\`, \`attempts\`, \`runAt\`, \`createdAt\`, \`updatedAt\`)
    VALUES
      (${data.mediaId}, ${data.filename}, ${data.storedPath}, 'PENDING', 0, ${
        data.runAt
      }, NOW(3), NOW(3))
  `;
}

async function findNextScanJob({
  now,
  lockCutoff,
  maxAttempts,
}: {
  now: Date;
  lockCutoff: Date;
  maxAttempts: number;
}): Promise<MediaScanJobRecord | null> {
  if (hasMediaScanJobDelegate()) {
    return prismaAny.mediaScanJob.findFirst({
      where: {
        status: { in: ["PENDING", "FAILED"] },
        runAt: { lte: now },
        attempts: { lt: maxAttempts },
        OR: [{ lockedAt: null }, { lockedAt: { lt: lockCutoff } }],
      },
      orderBy: [{ runAt: "asc" }, { id: "asc" }],
    });
  }

  const rows = (await prisma.$queryRaw<
    MediaScanJobRecord[]
  >`
    SELECT
      id,
      mediaId,
      filename,
      storedPath,
      status,
      attempts,
      lockedAt,
      runAt
    FROM media_scan_jobs
    WHERE status IN ('PENDING', 'FAILED')
      AND runAt <= ${now}
      AND attempts < ${maxAttempts}
      AND (lockedAt IS NULL OR lockedAt < ${lockCutoff})
    ORDER BY runAt ASC, id ASC
    LIMIT 1
  `) as MediaScanJobRecord[];

  return rows[0] ?? null;
}

async function claimScanJob(job: MediaScanJobRecord, now: Date) {
  if (hasMediaScanJobDelegate()) {
    return prismaAny.mediaScanJob.updateMany({
      where: {
        id: job.id,
        status: job.status,
        lockedAt: job.lockedAt,
      },
      data: {
        status: "PROCESSING",
        lockedAt: now,
        attempts: { increment: 1 },
      },
    });
  }

  const updated = await prisma.$executeRaw`
    UPDATE media_scan_jobs
    SET status = 'PROCESSING',
        lockedAt = ${now},
        attempts = attempts + 1,
        updatedAt = NOW(3)
    WHERE id = ${job.id}
      AND status = ${job.status}
      AND (lockedAt <=> ${job.lockedAt})
  `;

  return { count: Number(updated) || 0 };
}

async function finalizeScanJob(
  jobId: number,
  status: MediaScanJobStatus,
  lastError: string | null,
  runAt?: Date
) {
  if (hasMediaScanJobDelegate()) {
    return prismaAny.mediaScanJob.update({
      where: { id: jobId },
      data: {
        status,
        lockedAt: null,
        lastError,
        ...(runAt ? { runAt } : {}),
      },
    });
  }

  if (runAt) {
    return prisma.$executeRaw`
      UPDATE media_scan_jobs
      SET status = ${status},
          lockedAt = NULL,
          lastError = ${lastError},
          runAt = ${runAt},
          updatedAt = NOW(3)
      WHERE id = ${jobId}
    `;
  }

  return prisma.$executeRaw`
    UPDATE media_scan_jobs
    SET status = ${status},
        lockedAt = NULL,
        lastError = ${lastError},
        updatedAt = NOW(3)
    WHERE id = ${jobId}
  `;
}

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

function getJobLockTimeoutMs() {
  return (
    Number(process.env.VIRUSTOTAL_JOB_LOCK_TIMEOUT_MS) ||
    DEFAULT_JOB_LOCK_TIMEOUT_MS
  );
}

function getJobRetryDelayMs() {
  return (
    Number(process.env.VIRUSTOTAL_JOB_RETRY_DELAY_MS) ||
    DEFAULT_JOB_RETRY_DELAY_MS
  );
}

function getMaxJobAttempts() {
  return (
    Number(process.env.VIRUSTOTAL_MAX_JOB_ATTEMPTS) ||
    DEFAULT_MAX_JOB_ATTEMPTS
  );
}

function isMalicious(stats?: VirusTotalStats) {
  if (!stats) return false;
  return (stats.malicious ?? 0) > 0 || (stats.suspicious ?? 0) > 0;
}

function formatVirusTotalError(status: number, json?: { error?: unknown }) {
  const rawMessage =
    typeof json?.error === "object" &&
    json?.error !== null &&
    "message" in json.error
      ? String((json.error as { message?: string }).message ?? "")
      : "";
  let reason = "";

  if (status === 401 || status === 403) {
    reason = "VirusTotal API key invalid or expired.";
  } else if (status === 429) {
    reason = "VirusTotal rate limit exceeded. Please try again later.";
  } else if (status === 408 || status === 504) {
    reason = "VirusTotal request timed out.";
  } else if (status >= 500) {
    reason = `VirusTotal service unavailable (status ${status}).`;
  } else {
    reason = `VirusTotal request failed (status ${status}).`;
  }

  if (rawMessage && !reason.includes(rawMessage)) {
    reason = `${reason} ${rawMessage}`.trim();
  }

  return reason;
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
    return {
      status: "error" as const,
      reason: formatVirusTotalError(res.status, json),
    };
  }

  const stats = json?.data?.attributes?.last_analysis_stats as
    | VirusTotalStats
    | undefined;
  return { status: "found" as const, stats };
}

type UploadPayloadBuffer = Buffer | ArrayBuffer | ArrayBufferView;

async function submitFile(buffer: UploadPayloadBuffer, filename: string, apiKey: string) {
  const form = new FormData();
  let bytes: Uint8Array;
  if (Buffer.isBuffer(buffer)) {
    bytes = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (ArrayBuffer.isView(buffer)) {
    const view = buffer as ArrayBufferView;
    bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  } else {
    bytes = new Uint8Array(buffer);
  }
  const normalized = new Uint8Array(bytes);
  const blob = new Blob([normalized.buffer], { type: "application/octet-stream" });
  form.append("file", blob, filename || "upload.bin");

  const { res, json } = await fetchJson(
    `${VT_BASE_URL}/files`,
    { method: "POST", headers: { "x-apikey": apiKey }, body: form },
    getTimeoutMs()
  );

  if (!res.ok) {
    return {
      status: "error" as const,
      reason: formatVirusTotalError(res.status, json),
    };
  }

  const id = json?.data?.id;
  if (!id) {
    return {
      status: "error" as const,
      reason: "VirusTotal response missing analysis id.",
    };
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

    if (!res.ok) {
      const reason = formatVirusTotalError(res.status, json);
      if (res.status >= 400 && res.status < 500 && res.status !== 404) {
        return { status: "error" as const, reason };
      }
      continue;
    }
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
    return {
      status: "skipped",
      hash,
      reason: "VirusTotal API key not configured.",
    };
  }
  const report = await getFileReport(hash, apiKey);

  if (report.status === "found") {
    if (isMalicious(report.stats)) {
      return { status: "malicious", hash, stats: report.stats };
    }
    return { status: "clean", hash, stats: report.stats };
  }

  if (report.status === "error") {
    return { status: "unknown", hash, reason: report.reason };
  }

  const submission = await submitFile(buffer, filename, apiKey);
  if (submission.status === "error") {
    return { status: "unknown", hash, reason: submission.reason };
  }

  const analysis = await pollAnalysis(submission.id, apiKey);
  if (analysis.status === "error") {
    return { status: "unknown", hash, reason: analysis.reason };
  }
  if (analysis.status !== "completed") {
    return { status: "unknown", hash, reason: "Virus scan timed out." };
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
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  try {
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
      const updated = await prisma.media.update({
        where: { id: mediaId },
        data: {
          isVisibility: "REMOVE",
          isAccessible: "RESTRICTED",
          scanStatus: "MALICIOUS",
          scanMessage: "Virus scan flagged this file.",
          scanHash: finalHash,
          scannedAt,
        },
        select: {
          id: true,
          filename: true,
          uploadedById: true,
          bucket: { select: { id: true, slug: true } },
        },
      });

      await logAudit({
        actorId: updated.uploadedById,
        action: "media.upload.malicious",
        resourceType: "Media",
        resourceId: updated.id,
        status: 422,
        metadata: {
          bucketId: updated.bucket.id,
          bucketSlug: updated.bucket.slug,
          filename: updated.filename,
          scanHash: finalHash,
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
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: unknown }).code === "P2025"
    ) {
      console.warn("Media record deleted before scan could complete", {
        mediaId,
      });
      return;
    }

    const reason =
      error instanceof Error ? error.message : "Unknown virus scan error.";
    const scannedAt = new Date();
    try {
      await prisma.media.update({
        where: { id: mediaId },
        data: {
          scanStatus: "FAILED",
          scanMessage: reason,
          scanHash: hash,
          scannedAt,
        },
      });
    } catch (updateError) {
      if (
        typeof updateError === "object" &&
        updateError !== null &&
        "code" in updateError &&
        (updateError as { code?: unknown }).code === "P2025"
      ) {
        console.warn("Cannot mark scan failure: media already removed", {
          mediaId,
        });
      } else {
        console.error("Failed to mark scan failure:", updateError);
      }
    }
    console.error("Virus scan failed:", error);
  }
}

export function queueVirusTotalScanForMedia({
  mediaId,
  filename,
  buffer: _buffer,
  storedPath,
}: {
  mediaId: number;
  filename: string;
  buffer: Buffer;
  storedPath?: string;
}) {
  if (!storedPath) {
    const scannedAt = new Date();
    prisma.media
      .update({
        where: { id: mediaId },
        data: {
          scanStatus: "FAILED",
          scanMessage: "Missing stored path for virus scan.",
          scannedAt,
        },
      })
      .catch((error) => {
        console.error("Failed to mark scan failure:", error);
      });
    return;
  }

  enqueueScanJob({
    mediaId,
    filename: filename || "upload.bin",
    storedPath,
    runAt: new Date(),
  })
    .catch((error) => {
      console.error("Failed to enqueue virus scan:", error);
    });
}

async function claimNextScanJob(): Promise<MediaScanJobRecord | null> {
  const now = new Date();
  const lockCutoff = new Date(now.getTime() - getJobLockTimeoutMs());
  const job = await findNextScanJob({
    now,
    lockCutoff,
    maxAttempts: getMaxJobAttempts(),
  });

  if (!job) return null;

  const claimed = await claimScanJob(job, now);

  if (claimed.count === 0) return null;
  return {
    ...job,
    status: "PROCESSING",
    lockedAt: now,
    attempts: job.attempts + 1,
  };
}

export async function processNextVirusScanJob() {
  const job = await claimNextScanJob();
  if (!job) return false;

  try {
    if (!job.storedPath) {
      throw new Error("Missing stored path for scan.");
    }
    const buffer = await fs.readFile(job.storedPath);
    await runVirusTotalScanForMedia({
      mediaId: job.mediaId,
      filename: job.filename,
      buffer,
      storedPath: job.storedPath,
    });
    await finalizeScanJob(job.id, "DONE", null);
  } catch (error) {
    const reason =
      error instanceof Error ? error.message : "Virus scan job failed.";
    const retryAt = new Date(Date.now() + getJobRetryDelayMs());
    const trimmed = reason.length > 190 ? reason.slice(0, 190) : reason;
    await prisma.media
      .update({
        where: { id: job.mediaId },
        data: {
          scanStatus: "FAILED",
          scanMessage: trimmed,
          scannedAt: new Date(),
        },
      })
      .catch((updateError) => {
        console.error("Failed to mark scan failure:", updateError);
      });
    await finalizeScanJob(job.id, "FAILED", trimmed, retryAt);
  }
  return true;
}
