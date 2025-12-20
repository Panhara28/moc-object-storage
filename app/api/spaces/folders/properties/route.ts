import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { format as formatDateFns } from "date-fns";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatDate(input: Date | string | null | undefined) {
  if (!input) return "N/A";
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "N/A";
  return formatDateFns(d, "dd/LLL/yyyy HH:mm");
}

export async function GET(req: NextRequest) {
  try {
    const auth = await authorize(req, "media-library", "read");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const folderSlug = searchParams.get("slug");

    if (!folderSlug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const folder = await prisma.space.findFirst({
      where: {
        slug: folderSlug,
        isAvailable: { not: "REMOVE" },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        parentId: true,
        bucketId: true,
        mediaId: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        bucket: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    if (folder.mediaId !== null) {
      return NextResponse.json({ error: "Not a folder." }, { status: 400 });
    }

    if (folder.userId !== user.id) {
      return NextResponse.json(
        { error: "Not authorized to view this folder." },
        { status: 403 }
      );
    }

    const folderIds: number[] = [folder.id];
    const fileSpaceIds: number[] = [];
    let frontier: number[] = [folder.id];

    while (frontier.length) {
      const children = await prisma.space.findMany({
        where: {
          parentId: { in: frontier },
          isAvailable: { not: "REMOVE" },
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
      folderIds.push(...childFolderIds);
      fileSpaceIds.push(...childFileIds);
      frontier = childFolderIds;
    }

    const fileSpaceMediaIds = await prisma.space.findMany({
      where: { id: { in: fileSpaceIds }, mediaId: { not: null } },
      select: { mediaId: true },
    });

    const linkedMediaIds = await prisma.mediaUploadDetail.findMany({
      where: { spaceId: { in: [...folderIds, ...fileSpaceIds] } },
      select: { mediaId: true },
    });

    const mediaIds = Array.from(
      new Set(
        [
          ...fileSpaceMediaIds.map((m) => m.mediaId),
          ...linkedMediaIds.map((m) => m.mediaId),
        ].filter((m): m is number => m !== null)
      )
    );

    let totalSize = 0;
    let mediaCount = 0;

    if (mediaIds.length) {
      const mediaRecords = await prisma.media.findMany({
        where: {
          id: { in: mediaIds },
          isVisibility: { not: "REMOVE" },
        },
        select: { id: true, size: true },
      });

      mediaCount = mediaRecords.length;
      totalSize = mediaRecords.reduce((sum, m) => sum + (m.size || 0), 0);
    }

    return NextResponse.json({
      folder: {
        id: folder.id,
        slug: folder.slug,
        name: folder.name,
        createdAt: formatDate(folder.createdAt),
        updatedAt: formatDate(folder.updatedAt),
        bucketSlug: folder.bucket.slug,
        bucketName: folder.bucket.name,
      },
      stats: {
        totalSize,
        mediaCount,
        folderCount: folderIds.length,
      },
    });
  } catch (error: unknown) {
    console.error("FOLDER PROPERTIES ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
