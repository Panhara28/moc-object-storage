/* eslint-disable */
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { NextRequest, NextResponse } from "next/server";
import { MediaType, Prisma } from "@/app/generated/prisma/client";

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

    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const pathFilter = searchParams.get("path") || "";
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
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

    if (!bucket || bucket.createdById !== user.id) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

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

    if (pathFilter) {
      where.path = { contains: pathFilter };
    }

    if (dateFrom || dateTo) {
      const gte = dateFrom ? new Date(dateFrom) : undefined;
      const lte = dateTo ? new Date(dateTo) : undefined;

      if ((gte && isNaN(gte.getTime())) || (lte && isNaN(lte.getTime()))) {
        return NextResponse.json(
          { status: "error", message: "Invalid date range." },
          { status: 400 }
        );
      }

      where.createdAt = {
        ...(gte ? { gte } : {}),
        ...(lte ? { lte } : {}),
      };
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
          path: m.path,
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
      },
      { status: 500 }
    );
  }
}
