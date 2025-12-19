import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs/promises";
import { prisma } from "@/lib/connection";
import { verifyPayload } from "@/lib/signedUrl";

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin") return path.join(process.cwd(), "storage");
  if (process.platform === "linux") return "/mnt/storage";
  if (process.platform === "win32") return path.join(process.cwd(), "storage");
  return path.join(process.cwd(), "storage");
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

    console.log("bucket", bucket);

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

    const STORAGE_ROOT = getStorageRoot();
    const filePath = payload.path
      ? path.join(
          STORAGE_ROOT,
          payload.bucket,
          payload.path,
          payload.storedFilename
        )
      : path.join(STORAGE_ROOT, payload.bucket, payload.storedFilename);

    let fileBuffer: Buffer;
    try {
      fileBuffer = await fs.readFile(filePath);
    } catch {
      return NextResponse.json(
        { status: "error", message: "File not found." },
        { status: 404 }
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", payload.mimetype || "application/octet-stream");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(
        payload.filename || payload.storedFilename
      )}"`
    );

    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength
    ) as ArrayBuffer;

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Signed download error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to serve file.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
