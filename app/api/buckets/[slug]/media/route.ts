/* eslint-disable */
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { slug: string } }) {
  try {
    const { slug } = context.params;

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
    // BUILD WHERE CLAUSE FOR MEDIA
    // ---------------------------------------
    const where: any = {
      bucket: { slug },
    };

    if (search) {
      where.filename = { contains: search, mode: "insensitive" };
    }

    if (type && type !== "all") {
      where.fileType = type;
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
        createdAt: bucket.createdAt,
        updatedAt: bucket.updatedAt,
      },

      // 🟦 FOLDERS (spaces)
      folders: bucket.spaces.map((f) => ({
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
  } catch (error: any) {
    console.error("❌ Bucket Detail Error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch bucket details",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
