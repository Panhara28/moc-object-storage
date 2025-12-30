// app/api/buckets/[slug]/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";
import * as fs from "fs/promises";
import path from "path";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const auth = await authorize(req, "buckets", "delete");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    // Ensure bucket exists
    const bucket = await prisma.bucket.findFirst({
      where: { slug, createdById: user.id },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    if (!isSafeSegment(bucket.name)) {
      return NextResponse.json(
        { status: "error", message: "Invalid bucket name." },
        { status: 400 }
      );
    }

    const storageRoot = getStorageRoot();
    const bucketDir = path.join(storageRoot, bucket.name);
    assertPathInsideBase(storageRoot, bucketDir);

    const [updatedBucket, spacesUpdated, mediaUpdated] =
      await prisma.$transaction([
        prisma.bucket.update({
          where: { id: bucket.id },
          data: { isAvailable: "REMOVE" },
          select: {
            id: true,
            name: true,
            slug: true,
            permission: true,
            isAvailable: true,
            updatedAt: true,
            createdAt: true,
          },
        }),
        prisma.space.updateMany({
          where: { bucketId: bucket.id },
          data: { isAvailable: "REMOVE" },
        }),
        prisma.media.updateMany({
          where: { bucketId: bucket.id },
          data: { isVisibility: "REMOVE" },
        }),
      ]);

    // Attempt filesystem cleanup; ignore errors to keep response consistent
    try {
      await fs.rm(bucketDir, { recursive: true, force: true });
    } catch (fsErr) {
      console.error(
        "Failed to remove bucket directory from filesystem:",
        fsErr
      );
    }

    await logAudit({
      ...auditInfo,
      actorId: auth!.user!.id,
      action: "bucket.delete",
      resourceType: "Bucket",
      resourceId: updatedBucket.id,
      status: 200,
      metadata: {
        bucketSlug: updatedBucket.slug,
        spacesUpdated: spacesUpdated.count,
        mediaUpdated: mediaUpdated.count,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Bucket removed successfully",
      bucket: updatedBucket,
      spacesUpdated: spacesUpdated.count,
      mediaUpdated: mediaUpdated.count,
    });
  } catch (err: unknown) {
    console.error("Bucket Delete Error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err instanceof Error ? err.message : "Failed to delete bucket",
      },
      { status: 500 }
    );
  }
}
