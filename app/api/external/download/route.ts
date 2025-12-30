import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiAuthSuccess, getApiAuthentication } from "@/lib/api-auth";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";
import { createReadStream } from "fs";
import * as fs from "fs/promises";
import path from "path";
import { Readable } from "stream";

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin") return path.join(process.cwd(), "storage");
  if (process.platform === "linux") return "/mnt/storage";
  if (process.platform === "win32") return path.join(process.cwd(), "storage");
  return path.join(process.cwd(), "storage");
}

function normalizePath(input?: string | null) {
  if (!input) return null;
  const trimmed = input.replace(/\\/g, "/").trim();
  const stripped = trimmed.replace(/^\/+|\/+$/g, "");
  if (!stripped) return null;
  if (stripped.includes("\0")) return null;
  const segments = stripped.split("/");
  for (const seg of segments) {
    if (!seg || seg === "." || seg === "..") return null;
    if (seg.includes("..") || seg.includes(":")) return null;
  }
  return segments.join("/");
}

function assertPathInsideBase(base: string, target: string) {
  const baseResolved = path.resolve(base);
  const targetResolved = path.resolve(target);
  if (
    targetResolved !== baseResolved &&
    !targetResolved.startsWith(baseResolved + path.sep)
  ) {
    throw new Error("Resolved path escapes storage root");
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getApiAuthentication(req);
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const successAuth = auth as ApiAuthSuccess;
    const key = successAuth.key;

    const mediaSlug = req.nextUrl.searchParams.get("mediaSlug");
    if (!mediaSlug) {
      return NextResponse.json(
        { status: "error", message: "Missing media slug." },
        { status: 400 }
      );
    }

    const media = await prisma.media.findUnique({
      where: { slug: mediaSlug },
      select: {
        bucketId: true,
        storedFilename: true,
        filename: true,
        mimetype: true,
        isAccessible: true,
        path: true,
      },
    });

    if (!media || media.bucketId !== key.bucketId) {
      return NextResponse.json(
        { status: "error", message: "Media not found in this bucket." },
        { status: 404 }
      );
    }

    if (media.isAccessible === "REMOVE") {
      return NextResponse.json(
        { status: "error", message: "Media is not accessible." },
        { status: 403 }
      );
    }

    const bucket = await prisma.bucket.findUnique({
      where: { id: key.bucketId },
      select: { name: true, slug: true },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found." },
        { status: 404 }
      );
    }

    const rawPath = req.nextUrl.searchParams.get("path");
    const normalizedPath = normalizePath(rawPath);
    if (rawPath && !normalizedPath) {
      return NextResponse.json(
        { status: "error", message: "Invalid path." },
        { status: 400 }
      );
    }

    const STORAGE_ROOT = getStorageRoot();
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);
    const filePath = normalizedPath
      ? path.join(bucketDir, normalizedPath, media.storedFilename)
      : path.join(bucketDir, media.storedFilename);
    assertPathInsideBase(bucketDir, filePath);

    let stat: { size: number };
    try {
      stat = await fs.stat(filePath);
    } catch {
      return NextResponse.json(
        { status: "error", message: "File not found." },
        { status: 404 }
      );
    }

    const inline = req.nextUrl.searchParams.get("inline") === "true";
    const headers = new Headers();
    headers.set("Content-Type", media.mimetype || "application/octet-stream");
    headers.set(
      "Content-Disposition",
      `${inline ? "inline" : "attachment"}; filename="${encodeURIComponent(
        media.filename || media.storedFilename
      )}"`
    );
    if (Number.isFinite(stat.size)) {
      headers.set("Content-Length", String(stat.size));
    }

    const nodeStream = createReadStream(filePath);
    const stream = Readable.toWeb(nodeStream) as ReadableStream;

    await logAudit({
      ...getAuditRequestInfo(req),
      actorId: null,
      action: "external.media.download",
      resourceType: "Media",
      resourceId: mediaSlug,
      status: 200,
      metadata: {
        bucketSlug: bucket.slug,
        accessKeyId: key.accessKeyId,
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("External download error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to download file." },
      { status: 500 }
    );
  }
}
