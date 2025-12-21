// app/api/buckets/[slug]/rename/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    // Authorization check
    const auth = await authorize(req, "media-library", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    const { name } = await req.json();

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { status: "error", message: "Bucket name is required" },
        { status: 400 }
      );
    }

    const newName = name.trim();
    if (!isSafeSegment(newName)) {
      return NextResponse.json(
        { status: "error", message: "Invalid bucket name." },
        { status: 400 }
      );
    }

    // Ensure bucket exists
    const bucketExists = await prisma.bucket.findUnique({
      where: { slug },
    });

    if (!bucketExists) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }
    const oldName = bucketExists.name;

    if (!isSafeSegment(bucketExists.name)) {
      return NextResponse.json(
        { status: "error", message: "Invalid bucket name." },
        { status: 400 }
      );
    }

    if (bucketExists.name === newName) {
      return NextResponse.json({
        status: "ok",
        message: "Bucket name unchanged",
        bucket: bucketExists,
      });
    }

    // Prevent duplicate bucket names in the database
    const nameInUse = await prisma.bucket.findUnique({
      where: { name: newName },
      select: { id: true },
    });

    if (nameInUse && nameInUse.id !== bucketExists.id) {
      return NextResponse.json(
        {
          status: "error",
          message: "A bucket with that name already exists.",
        },
        { status: 400 }
      );
    }

    const STORAGE_ROOT = getStorageRoot();
    const oldDir = path.join(STORAGE_ROOT, bucketExists.name);
    const newDir = path.join(STORAGE_ROOT, newName);
    assertPathInsideBase(STORAGE_ROOT, oldDir);
    assertPathInsideBase(STORAGE_ROOT, newDir);

    // Prevent accidental overwrite if a directory with the target name already exists
    try {
      await fs.access(newDir);
      return NextResponse.json(
        {
          status: "error",
          message: "A bucket directory with the new name already exists.",
        },
        { status: 400 }
      );
    } catch {
      // newDir does not exist, safe to proceed
    }

    let renamedOnDisk = false;

    try {
      await fs.access(oldDir);
      await fs.rename(oldDir, newDir);
      renamedOnDisk = true;
    } catch (fsErr: unknown) {
      const code = fsErr instanceof Error && (fsErr as any).code;
      if (code === "ENOENT") {
        // If the old directory does not exist, create the new one so future writes succeed.
        await fs.mkdir(newDir, { recursive: true });
      } else {
        throw fsErr;
      }
    }

    // Update bucket name
    const updatedBucket = await prisma.bucket
      .update({
        where: { slug },
        data: { name: newName },
        select: {
          id: true,
          name: true,
          slug: true,
          accessKeyId: true,
          permission: true,
          isAvailable: true,
          updatedAt: true,
          createdAt: true,
        },
      })
      .catch(async (dbErr) => {
        if (renamedOnDisk) {
          try {
            await fs.rename(newDir, oldDir);
          } catch (revertErr) {
            console.error(
              "Failed to revert bucket directory rename:",
              revertErr
            );
          }
        }
        throw dbErr;
      });

    await logAudit({
      ...auditInfo,
      actorId: auth.user.id,
      action: "bucket.rename",
      resourceType: "Bucket",
      resourceId: updatedBucket.id,
      status: 200,
      metadata: {
        bucketSlug: slug,
        oldName,
        newName,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Bucket renamed successfully",
      bucket: updatedBucket,
    });
  } catch (err: unknown) {
    console.error("Rename Bucket Error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err instanceof Error ? err.message : "Failed to rename bucket",
      },
      { status: 500 }
    );
  }
}
