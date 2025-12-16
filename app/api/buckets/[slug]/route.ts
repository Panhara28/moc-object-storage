/* eslint-disable */
import { prisma } from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, MediaType } from "@/lib/generated/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const skip = (page - 1) * limit;

    // ---------------------------------------
    // FETCH BUCKET
    // ---------------------------------------
    const bucket = await prisma.bucket.findUnique({
      where: { slug, isAvailable: "AVAILABLE" },
      include: {
        spaces: true,
      },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    // ---------------------------------------
    // FILTER PARENT FOLDERS (spaces)
    // ---------------------------------------
    const parentSpaces = bucket.spaces.filter((f) => f.parentId === null);

    // ---------------------------------------
    // BUILD WHERE CLAUSE FOR MEDIA
    // ---------------------------------------
    const where: Prisma.MediaWhereInput = {
      bucket: { slug },
    };

    if (search) {
      where.filename = { contains: search };
    }

    if (type && type !== "all") {
      const mediaType = Object.values(MediaType).includes(type as MediaType)
        ? (type as MediaType)
        : undefined;
      if (mediaType) {
        where.fileType = mediaType;
      }
    }

    // ---------------------------------------
    // FETCH MEDIA
    // ---------------------------------------
    const media = await prisma.media.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalMedia = await prisma.media.count({ where });

    // ---------------------------------------
    // RESPONSE
    // ---------------------------------------
    return NextResponse.json({
      status: "ok",
      bucket: {
        id: bucket.id,
        name: bucket.name,
        slug: bucket.slug,
        permission: bucket.permission,
        accessKeyId: bucket.accessKeyId,
        createdAt: bucket.createdAt,
        updatedAt: bucket.updatedAt,
      },

      // 🟦 PARENT FOLDERS (spaces)
      folders: parentSpaces.map((f) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        createdAt: f.createdAt,
      })),

      // 🟩 MEDIA RESULT WITH PAGINATION
      media: {
        page,
        limit,
        total: totalMedia,
        items: media.map((m) => ({
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
    console.error("❌ Bucket Detail Error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch bucket details",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
