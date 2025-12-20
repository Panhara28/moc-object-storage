import { NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
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

type SpaceNode = {
  id: number;
  name: string;
  parentId: number | null;
  bucketId: number;
};

async function buildFolderPathSegments(
  folder: SpaceNode,
  bucketId: number
): Promise<string[]> {
  if (!isSafeSegment(folder.name)) {
    throw new Error("Invalid folder path segment.");
  }
  const segments = [folder.name];
  let currentParentId = folder.parentId;

  while (currentParentId !== null) {
    const ancestor = await prisma.space.findUnique({
      where: { id: currentParentId },
      select: { id: true, name: true, parentId: true, bucketId: true },
    });

    if (!ancestor) {
      throw new Error("Parent folder does not exist.");
    }

    if (ancestor.bucketId !== bucketId) {
      throw new Error("Parent folder does not belong to this bucket.");
    }

    if (!isSafeSegment(ancestor.name)) {
      throw new Error("Invalid folder path segment.");
    }

    segments.unshift(ancestor.name);
    currentParentId = ancestor.parentId;
  }

  return segments;
}

export async function POST(req: Request) {
  try {
    const auth = await authorize(req, "media-library", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const { folderId, name } = await req.json();
    const numericFolderId =
      folderId === null || folderId === undefined ? NaN : Number(folderId);

    if (!folderId || Number.isNaN(numericFolderId) || !name) {
      return NextResponse.json(
        { error: "folderId (number) and name are required" },
        { status: 400 }
      );
    }

    // Fetch folder
    const folder = await prisma.space.findFirst({
      where: { id: numericFolderId, isAvailable: "AVAILABLE" },
      select: {
        id: true,
        name: true,
        parentId: true,
        bucketId: true,
        mediaId: true,
        bucket: { select: { name: true } },
      },
    });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    // Prevent renaming files
    if (folder.mediaId !== null) {
      return NextResponse.json(
        { error: "You can only rename folders, not files" },
        { status: 400 }
      );
    }

    const newName = (name as string).trim();

    if (newName.length === 0) {
      return NextResponse.json(
        { error: "New folder name is required" },
        { status: 400 }
      );
    }

    if (!isSafeSegment(newName)) {
      return NextResponse.json(
        { error: "Invalid folder name." },
        { status: 400 }
      );
    }

    const storageRoot = getStorageRoot();
    const bucketDir = path.join(storageRoot, folder.bucket.name);
    if (!isSafeSegment(folder.bucket.name)) {
      return NextResponse.json(
        { error: "Invalid bucket name." },
        { status: 400 }
      );
    }
    assertPathInsideBase(storageRoot, bucketDir);

    let existingPathSegments: string[] = [];
    try {
      existingPathSegments = await buildFolderPathSegments(
        {
          id: folder.id,
          name: folder.name,
          parentId: folder.parentId,
          bucketId: folder.bucketId,
        },
        folder.bucketId
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to resolve existing folder path.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const parentSegments = existingPathSegments.slice(0, -1);
    const oldPath = path.join(bucketDir, ...existingPathSegments);
    const newPath = path.join(bucketDir, ...parentSegments, newName);
    assertPathInsideBase(bucketDir, oldPath);
    assertPathInsideBase(bucketDir, newPath);

    // Avoid overwriting an existing folder with the same target path
    try {
      await fs.access(newPath);
      return NextResponse.json(
        { error: "A folder with the new name already exists." },
        { status: 400 }
      );
    } catch {
      // newPath does not exist, safe to proceed
    }

    let renamedOnDisk = false;

    try {
      await fs.access(oldPath);
      await fs.rename(oldPath, newPath);
      renamedOnDisk = true;
    } catch (fsErr: unknown) {
      const code = fsErr instanceof Error && (fsErr as any).code;
      if (code === "ENOENT") {
        // If the old folder is missing, create the new one so future writes succeed
        await fs.mkdir(newPath, { recursive: true });
      } else {
        throw fsErr;
      }
    }

    // Update name ONLY
    await prisma.space
      .update({
        where: { id: numericFolderId },
        data: {
          name: newName,
        },
      })
      .catch(async (dbErr) => {
        if (renamedOnDisk) {
          try {
            await fs.rename(newPath, oldPath);
          } catch (revertErr) {
            console.error(
              "Failed to revert folder rename on filesystem:",
              revertErr
            );
          }
        }
        throw dbErr;
      });

    return NextResponse.json({
      message: "Folder renamed successfully",
      newName: newName,
    });
  } catch (error) {
    console.error("RENAME FOLDER ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
