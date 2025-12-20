import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs/promises";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin") return path.join(process.cwd(), "storage");
  if (process.platform === "linux") return "/mnt/storage";
  if (process.platform === "win32") return path.join(process.cwd(), "storage");
  return path.join(process.cwd(), "storage");
}

function isSafeSegment(segment: string) {
  return (
    segment.length > 0 &&
    !segment.includes("..") &&
    !segment.includes("/") &&
    !segment.includes("\\") &&
    !segment.includes(":") &&
    !segment.includes("\0")
  );
}

function normalizePath(input?: string | null) {
  if (!input) return "";
  const trimmed = input.replace(/\\/g, "/").trim();
  const stripped = trimmed.replace(/^\/+|\/+$/g, "");
  if (!stripped) return "";
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

export async function POST(req: NextRequest) {
  try {
    const auth = await authorize(req, "media-library", "update");
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

    const normalizedTargetPath = normalizePath(targetPathRaw);
    if (normalizedTargetPath === null) {
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
        size: true,
        fileType: true,
        path: true,
        bucket: {
          select: { id: true, name: true, slug: true, isAvailable: true },
        },
      },
    });

    if (!media) {
      return NextResponse.json(
        { status: "error", message: "Media not found." },
        { status: 404 }
      );
    }

    if (media.bucket.isAvailable !== "AVAILABLE") {
      return NextResponse.json(
        { status: "error", message: "Source bucket is not available." },
        { status: 400 }
      );
    }

    if (
      !isSafeSegment(media.bucket.name) ||
      !isSafeSegment(media.storedFilename)
    ) {
      return NextResponse.json(
        { status: "error", message: "Invalid media path." },
        { status: 400 }
      );
    }

    const rawMediaPath = typeof media.path === "string" ? media.path : null;
    const normalizedMediaPath = normalizePath(rawMediaPath);
    if (rawMediaPath && normalizedMediaPath === null) {
      return NextResponse.json(
        { status: "error", message: "Invalid media path." },
        { status: 400 }
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

    if (!isSafeSegment(targetBucket.name)) {
      return NextResponse.json(
        { status: "error", message: "Invalid target bucket." },
        { status: 400 }
      );
    }

    const STORAGE_ROOT = getStorageRoot();

    const sourceBucketDir = path.join(STORAGE_ROOT, media.bucket.name);
    assertPathInsideBase(STORAGE_ROOT, sourceBucketDir);
    const sourcePath = normalizedMediaPath
      ? path.join(sourceBucketDir, normalizedMediaPath, media.storedFilename)
      : path.join(sourceBucketDir, media.storedFilename);
    assertPathInsideBase(sourceBucketDir, sourcePath);

    const targetBucketDir = path.join(STORAGE_ROOT, targetBucket.name);
    assertPathInsideBase(STORAGE_ROOT, targetBucketDir);
    const targetDir = normalizedTargetPath
      ? path.join(targetBucketDir, normalizedTargetPath)
      : path.join(targetBucketDir);
    assertPathInsideBase(targetBucketDir, targetDir);

    const targetPath = path.join(targetDir, media.storedFilename);
    assertPathInsideBase(targetBucketDir, targetPath);

    await fs.mkdir(targetDir, { recursive: true });
    await fs.rename(sourcePath, targetPath);

    const updated = await prisma.media.update({
      where: { slug: media.slug },
      data: {
        bucketId: targetBucket.id,
        path: normalizedTargetPath || null,
        url: normalizedTargetPath
          ? `https://moc-drive.moc.gov.kh/${targetBucket.name}/${normalizedTargetPath}/${media.storedFilename}`
          : `https://moc-drive.moc.gov.kh/${targetBucket.name}/${media.storedFilename}`,
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

    return NextResponse.json({
      status: "ok",
      message: "Media moved successfully.",
      media: updated,
    });
  } catch (error) {
    console.error("Move media error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to move media.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
