import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs/promises";
import { createReadStream } from "fs";
import { Readable } from "stream";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { verifyPayload } from "@/lib/signedUrl";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Missing token." },
        { status: 400 }
      );
    }

    const payload = verifyPayload(token);
    if (!payload || payload.action !== "download") {
      return NextResponse.json(
        { status: "error", message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    if (!payload.storedFilename) {
      return NextResponse.json(
        { status: "error", message: "Missing file reference." },
        { status: 400 }
      );
    }

    if (!payload.mediaSlug) {
      return NextResponse.json(
        { status: "error", message: "Missing media reference." },
        { status: 400 }
      );
    }

    const bucket = await prisma.bucket.findUnique({
      where: { slug, isAvailable: "AVAILABLE" },
      select: { id: true, name: true },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found or unavailable." },
        { status: 404 }
      );
    }

    if (payload.bucket !== bucket.name) {
      return NextResponse.json(
        { status: "error", message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const media = await prisma.media.findUnique({
      where: { slug: payload.mediaSlug },
      select: { bucketId: true, isAccessible: true },
    });

    if (!media || media.bucketId !== bucket.id) {
      return NextResponse.json(
        { status: "error", message: "Media not found in this bucket." },
        { status: 404 }
      );
    }

    if (media.isAccessible !== "PUBLIC" && media.isAccessible !== "PRIVATE") {
      return NextResponse.json(
        { status: "error", message: "Media is not accessible." },
        { status: 403 }
      );
    }

    // Private files require an authenticated user with read permission.
    if (media.isAccessible === "PRIVATE") {
      const auth = await authorize(req, "media-library", "read");
      if (!auth.ok) {
        return NextResponse.json(
          { status: "error", message: auth.message },
          { status: auth.status }
        );
      }
    }

    const rawPath = typeof payload.path === "string" ? payload.path : null;
    const normalizedPath = normalizePath(rawPath);
    if (rawPath && !normalizedPath) {
      return NextResponse.json(
        { status: "error", message: "Invalid path in token." },
        { status: 400 }
      );
    }

    const STORAGE_ROOT = getStorageRoot();
    const bucketDir = path.join(STORAGE_ROOT, payload.bucket);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);
    const filePath = normalizedPath
      ? path.join(bucketDir, normalizedPath, payload.storedFilename)
      : path.join(bucketDir, payload.storedFilename);
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
    headers.set("Content-Type", payload.mimetype || "application/octet-stream");
    headers.set(
      "Content-Disposition",
      `${inline ? "inline" : "attachment"}; filename="${encodeURIComponent(
        payload.filename || payload.storedFilename
      )}"`
    );

    if (Number.isFinite(stat.size)) {
      headers.set("Content-Length", String(stat.size));
    }

    const nodeStream = createReadStream(filePath);
    const stream = Readable.toWeb(nodeStream) as ReadableStream;

    return new NextResponse(stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Signed download error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to serve file.",
      },
      { status: 500 }
    );
  }
}
