import { NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { getAuthUser } from "@/lib/auth";
import { authorize } from "@/lib/authorized";
import * as fs from "fs/promises";
import path from "path";

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
    console.log("folderId", folderId);
    const numericFolderId =
      folderId === null || folderId === undefined ? NaN : Number(folderId);
    console.log("numericFolderId", numericFolderId);
    if (!folderId || Number.isNaN(numericFolderId)) {
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

    console.log("folder", folder);

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

    const ids: number[] = [folder.id];
    let frontier: number[] = [folder.id];

    while (frontier.length) {
      const children = await prisma.space.findMany({
        where: { parentId: { in: frontier }, isAvailable: "AVAILABLE" },
        select: { id: true },
      });
      if (children.length === 0) break;
      const childIds = children.map((c) => c.id);
      ids.push(...childIds);
      frontier = childIds;
    }

    const mediaIds = await prisma.space
      .findMany({
        where: { id: { in: ids }, mediaId: { not: null } },
        select: { mediaId: true },
      })
      .then((rows) =>
        Array.from(
          new Set(
            rows
              .map((row) => row.mediaId)
              .filter((mediaId): mediaId is number => mediaId !== null)
          )
        )
      );

    console.log("mediaIds", mediaIds);

    const transactions = [
      prisma.space.updateMany({
        where: { id: { in: ids } },
        data: { isAvailable: "REMOVE" },
      }),
    ];

    if (mediaIds.length) {
      transactions.push(
        prisma.media.updateMany({
          where: { id: { in: mediaIds } },
          data: { visibility: "REMOVE" },
        })
      );
    }

    await prisma.$transaction(transactions);

    try {
      const storageRoot = getStorageRoot();
      const folderPathSegments = await buildFolderPathSegments(
        {
          id: folder.id,
          name: folder.name,
          parentId: folder.parentId,
          bucketId: folder.bucketId,
        },
        folder.bucketId
      );
      const folderFullPath = path.join(
        storageRoot,
        folder.bucket.name,
        ...folderPathSegments
      );
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
