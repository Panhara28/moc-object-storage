import { NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { getAuthUser } from "@/lib/auth";
import { authorize } from "@/lib/authorized";
import * as fs from "fs/promises";
import path from "path";

function isSafeSegment(segment: string) {
  return (
    segment.length > 0 &&
    !segment.includes("..") &&
    !segment.includes("/") &&
    !segment.includes("\\")
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

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin") return path.join(process.cwd(), "storage");
  if (process.platform === "linux") return "/mnt/storage";
  if (process.platform === "win32") return path.join(process.cwd(), "storage");
  return path.join(process.cwd(), "storage");
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

    segments.unshift(ancestor.name);
    currentParentId = ancestor.parentId;
  }

  if (!segments.every(isSafeSegment)) {
    throw new Error("Invalid folder path segment.");
  }

  return segments;
}

export async function POST(req: Request) {
  try {
    const auth = await authorize(req, "media-library", "delete");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { folderId } = await req.json();

    const numericFolderId =
      folderId === null || folderId === undefined ? NaN : Number(folderId);
    if (folderId == null || Number.isNaN(numericFolderId)) {
      return NextResponse.json(
        { error: "folderId (number) is required" },
        { status: 400 }
      );
    }

    const folder = await prisma.space.findFirst({
      where: { id: numericFolderId, isAvailable: "AVAILABLE" },
      select: {
        id: true,
        name: true,
        parentId: true,
        bucketId: true,
        mediaId: true,
        userId: true,
        bucket: { select: { name: true } },
      },
    });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    if (folder.mediaId !== null) {
      return NextResponse.json(
        { error: "You can only delete folders, not files" },
        { status: 400 }
      );
    }

    if (folder.userId !== user.id) {
      return NextResponse.json(
        { error: "Not authorized to delete this folder." },
        { status: 403 }
      );
    }

    if (!isSafeSegment(folder.name) || !isSafeSegment(folder.bucket.name)) {
      return NextResponse.json(
        { error: "Invalid folder or bucket path segment." },
        { status: 400 }
      );
    }

    const folderIds: number[] = [folder.id];
    const fileIds: number[] = [];
    const mediaIds: number[] = [];
    let frontier: number[] = [folder.id];

    while (frontier.length) {
      const children = await prisma.space.findMany({
        where: {
          parentId: { in: frontier },
          isAvailable: "AVAILABLE",
        },
        select: { id: true, mediaId: true },
      });
      if (children.length === 0) break;
      const childFolderIds = children
        .filter((c) => c.mediaId === null)
        .map((c) => c.id);
      const childFileIds = children
        .filter((c) => c.mediaId !== null)
        .map((c) => c.id);
      const childMediaIds = children
        .filter((c) => c.mediaId !== null)
        .map((c) => c.mediaId as number);
      folderIds.push(...childFolderIds);
      fileIds.push(...childFileIds);
      mediaIds.push(...childMediaIds);
      frontier = childFolderIds;
    }

    const ids = [...folderIds, ...fileIds];

    await prisma.space.updateMany({
      where: { id: { in: ids } },
      data: { isAvailable: "REMOVE" },
    });

    const linkedMediaIds = await prisma.mediaUploadDetail.findMany({
      where: { spaceId: { in: ids } },
      select: { mediaId: true },
    });

    const mediaIdsToRemove = Array.from(
      new Set([...mediaIds, ...linkedMediaIds.map((m) => m.mediaId)])
    );

    if (mediaIdsToRemove.length) {
      await prisma.media.updateMany({
        where: { id: { in: mediaIdsToRemove } },
        data: { isVisibility: "REMOVE" },
      });
    }

    try {
      const storageRoot = getStorageRoot();
      assertPathInsideBase(storageRoot, path.join(storageRoot));
      const folderPathSegments = await buildFolderPathSegments(
        {
          id: folder.id,
          name: folder.name,
          parentId: folder.parentId,
          bucketId: folder.bucketId,
        },
        folder.bucketId
      );
      const bucketPath = path.join(storageRoot, folder.bucket.name);
      assertPathInsideBase(storageRoot, bucketPath);
      const folderFullPath = path.join(bucketPath, ...folderPathSegments);
      assertPathInsideBase(bucketPath, folderFullPath);
      await fs.rm(folderFullPath, { recursive: true, force: true });
    } catch (fsErr) {
      console.error("Failed to delete folder on filesystem:", fsErr);
    }

    return NextResponse.json({
      message: "Folder deleted successfully.",
      removedFolderIds: ids,
    });
  } catch (error) {
    console.error("DELETE FOLDER ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
