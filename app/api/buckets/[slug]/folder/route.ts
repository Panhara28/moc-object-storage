/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const parentSlug = searchParams.get("parentSlug");
    const skip = (page - 1) * limit;

    // Find the bucket using the slug
    const bucket = await prisma.bucket.findUnique({
      where: { slug },
    });

    if (!bucket) {
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
      createdAt: folder.createdAt,
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
        bucketId: bucket.id, // Only media from the specified bucket
        isDeleted: false, // Only non-deleted media
        visibility: "PUBLIC", // Only public media
        path: parentSpace.name, // Only media in this folder (based on folder name)
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }, // Sort by creation date
    });

    const totalMedia = await prisma.media.count({
      where: {
        bucketId: bucket.id,
        isDeleted: false,
        visibility: "PUBLIC",
        path: parentSpace.name,
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
          name: m.filename,
          url: m.url,
          type: m.fileType,
          size: m.size,
          createdAt: m.createdAt,
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
