/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { format as formatDateFns } from "date-fns";

function formatDate(input: Date | string | null | undefined) {
  if (!input) return "N/A";
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "N/A";
  return formatDateFns(d, "dd/LLL/yyyy HH:mm");
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const auth = await authorize(req, "media-library", "read");
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
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const parentSlug = searchParams.get("parentSlug");
    const skip = (page - 1) * limit;

    // Find the bucket using the slug
    const bucket = await prisma.bucket.findUnique({
      where: { slug },
    });

    if (!bucket || bucket.createdById !== user.id) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    if (!parentSlug) {
      return NextResponse.json(
        { status: "error", message: "parentSlug is required" },
        { status: 400 }
      );
    }

    const folders = await prisma.space.findMany({
      where: {
        bucketId: bucket.id,
        isAvailable: "AVAILABLE",
        parent: { slug: parentSlug },
      },
      orderBy: { createdAt: "desc" },
    });

    // Map through the folders and add media data
    const folderData = folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      slug: folder.slug,
      type: "folder",
      parentId: folder.parentId,
      createdAt: formatDate(folder.createdAt),
      createdAtRaw: folder.createdAt.toISOString(),
    }));

    const parentSpace = await prisma.space.findUnique({
      where: { slug: parentSlug },
    });

    if (!parentSpace) {
      return NextResponse.json(
        { status: "error", message: "Parent folder (space) not found" },
        { status: 404 }
      );
    }

    const medias = await prisma.media.findMany({
      where: {
        bucketId: bucket.id,
        isVisibility: { in: ["AVAILABLE", "DRAFTED"] },
        path: parentSpace.name,
        scanStatus: { in: ["CLEAN", "PENDING"] },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }, // Sort by creation date
    });

    const totalMedia = await prisma.media.count({
      where: {
        bucketId: bucket.id,
        isVisibility: { in: ["AVAILABLE", "DRAFTED"] },
        path: parentSpace.name,
        scanStatus: { in: ["CLEAN", "PENDING"] },
      },
    });

    return NextResponse.json({
      status: "ok",
      folders: folderData,
      media: {
        page,
        limit,
        total: totalMedia,
        items: medias.map((m) => ({
          id: m.id,
          slug: m.slug,
          name: m.filename,
          url: m.url,
          type: m.fileType,
          size: m.size,
          scanStatus: m.scanStatus,
          scanMessage: m.scanMessage,
          createdAt: formatDate(m.createdAt),
          createdAtRaw: m.createdAt.toISOString(),
          //   folderId: m.spaceId,
        })),
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
