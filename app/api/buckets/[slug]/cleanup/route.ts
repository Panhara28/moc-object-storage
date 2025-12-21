import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import * as fs from "fs/promises";
import path from "path";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await authorize(req, "media-library", "delete");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    const { slug } = await params;
    const body = await req.json().catch(() => ({}));
    const { confirm, bucketSlug } = body as {
      confirm?: boolean;
      bucketSlug?: string;
    };

    // Double confirmation to avoid accidental wipes
    if (!confirm || bucketSlug !== slug) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Cleanup not confirmed. Include { confirm: true, bucketSlug: '<slug>' } in the body.",
        },
        { status: 400 }
      );
    }

    const bucket = await prisma.bucket.findUnique({
      where: { slug },
      select: { id: true, name: true, isAvailable: true },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found." },
        { status: 404 }
      );
    }

    if (!isSafeSegment(bucket.name)) {
      return NextResponse.json(
        { status: "error", message: "Invalid bucket name." },
        { status: 400 }
      );
    }

    // Collect ids for deletions
    const mediaIds = await prisma.media.findMany({
      where: { bucketId: bucket.id },
      select: { id: true },
    });
    const mediaIdList = mediaIds.map((m) => m.id);

    const spaceIds = await prisma.space.findMany({
      where: { bucketId: bucket.id },
      select: { id: true },
    });
    const spaceIdList = spaceIds.map((s) => s.id);

    // Delete dependent rows first
    if (mediaIdList.length > 0) {
      await prisma.mediaUploadDetail.deleteMany({
        where: { mediaId: { in: mediaIdList } },
      });
    }
    if (spaceIdList.length > 0) {
      await prisma.mediaUploadDetail.deleteMany({
        where: { spaceId: { in: spaceIdList } },
      });
    }

    // Delete spaces first (they reference media)
    await prisma.space.deleteMany({ where: { bucketId: bucket.id } });
    await prisma.media.deleteMany({ where: { bucketId: bucket.id } });

    // Remove files from disk
    const STORAGE_ROOT = getStorageRoot();
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);
    await fs.rm(bucketDir, { recursive: true, force: true });
    await fs.mkdir(bucketDir, { recursive: true });

    await logAudit({
      ...auditInfo,
      actorId: auth.user.id,
      action: "bucket.cleanup",
      resourceType: "Bucket",
      resourceId: bucket.id,
      status: 200,
      metadata: {
        bucketSlug: slug,
        removedMedia: mediaIdList.length,
        removedFolders: spaceIdList.length,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Bucket cleaned successfully.",
      bucket: bucket.name,
      removedMedia: mediaIdList.length,
      removedFolders: spaceIdList.length,
    });
  } catch (error) {
    console.error("Bucket cleanup error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to clean bucket.",
      },
      { status: 500 }
    );
  }
}
