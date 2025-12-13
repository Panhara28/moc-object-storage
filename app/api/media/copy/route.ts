import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs/promises";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin") return path.join(process.cwd(), "storage");
  if (process.platform === "linux") return "/mnt/storage";
  if (process.platform === "win32") return path.join(process.cwd(), "storage");
  return path.join(process.cwd(), "storage");
}

function normalizePath(input?: string | null) {
  if (!input) return "";
  const trimmed = input.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  if (trimmed.includes("..")) return null;
  return trimmed;
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authorize(req, "media-library", "create");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const body = await req.json();
    const mediaSlug: string | undefined = body.mediaSlug;
    const targetBucketSlug: string | undefined = body.targetBucketSlug;
    const targetPathRaw: string | undefined = body.targetPath;

    if (!mediaSlug) {
      return NextResponse.json(
        { status: "error", message: "mediaSlug is required." },
        { status: 400 }
      );
    }

    const normalizedPath = normalizePath(targetPathRaw);
    if (normalizedPath === null) {
      return NextResponse.json(
        { status: "error", message: "Invalid targetPath." },
        { status: 400 }
      );
    }

    const media = await prisma.media.findUnique({
      where: { slug: mediaSlug },
      select: {
        id: true,
        slug: true,
        filename: true,
        storedFilename: true,
        mimetype: true,
        extension: true,
        size: true,
        fileType: true,
        path: true,
        uploadedById: true,
        bucket: { select: { id: true, name: true, slug: true, isAvailable: true } },
      },
    });

    if (!media) {
      return NextResponse.json(
        { status: "error", message: "Media not found." },
        { status: 404 }
      );
    }

    const targetBucket =
      targetBucketSlug && targetBucketSlug !== media.bucket.slug
        ? await prisma.bucket.findUnique({
            where: { slug: targetBucketSlug, isAvailable: "AVAILABLE" },
            select: { id: true, name: true, slug: true },
          })
        : media.bucket;

    if (!targetBucket) {
      return NextResponse.json(
        { status: "error", message: "Target bucket not found or unavailable." },
        { status: 404 }
      );
    }

    const STORAGE_ROOT = getStorageRoot();

    const sourcePath = media.path
      ? path.join(STORAGE_ROOT, media.bucket.name, media.path, media.storedFilename)
      : path.join(STORAGE_ROOT, media.bucket.name, media.storedFilename);

    const targetDir = normalizedPath
      ? path.join(STORAGE_ROOT, targetBucket.name, normalizedPath)
      : path.join(STORAGE_ROOT, targetBucket.name);

    const ext = path.extname(media.storedFilename);
    const newStoredFilename = `${randomUUID()}${ext}`;
    const targetPath = path.join(targetDir, newStoredFilename);

    await fs.mkdir(targetDir, { recursive: true });
    await fs.copyFile(sourcePath, targetPath);

    const newMedia = await prisma.media.create({
      data: {
        filename: media.filename,
        storedFilename: newStoredFilename,
        url: normalizedPath
          ? `https://moc-drive.moc.gov.kh/${targetBucket.name}/${normalizedPath}/${newStoredFilename}`
          : `https://moc-drive.moc.gov.kh/${targetBucket.name}/${newStoredFilename}`,
        fileType: media.fileType,
        mimetype: media.mimetype,
        extension: media.extension,
        size: media.size,
        uploadedById: media.uploadedById,
        bucketId: targetBucket.id,
        path: normalizedPath || null,
      },
      select: {
        slug: true,
        filename: true,
        storedFilename: true,
        url: true,
        fileType: true,
        size: true,
        path: true,
        bucketId: true,
      },
    });

    return NextResponse.json(
      {
        status: "ok",
        message: "Media copied successfully.",
        media: newMedia,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Copy media error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to copy media.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
