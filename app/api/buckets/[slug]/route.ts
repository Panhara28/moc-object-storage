/* eslint-disable */
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { NextRequest, NextResponse } from "next/server";
import { format as formatDateFns } from "date-fns";
import { MediaType, Prisma } from "@/app/generated/prisma/client";

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

    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const skip = (page - 1) * limit;

    // ---------------------------------------
    // FETCH BUCKET
    // ---------------------------------------
    const bucket = await prisma.bucket.findUnique({
      where: { slug, isAvailable: "AVAILABLE" },
      include: {
        spaces: {
          where: { isAvailable: "AVAILABLE" },
        },
      },
    });

    if (!bucket || bucket.createdById !== user.id) {
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
      isVisibility: { in: ["AVAILABLE", "DRAFTED"] },
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
        createdAt: formatDate(bucket.createdAt),
        updatedAt: formatDate(bucket.updatedAt),
      },

      // 🟦 PARENT FOLDERS (spaces)
      folders: parentSpaces.map((f) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        createdAt: formatDate(f.createdAt),
        createdAtRaw: f.createdAt.toISOString(),
      })),

      // 🟩 MEDIA RESULT WITH PAGINATION
      media: {
        page,
        limit,
        total: totalMedia,
        items: media.map((m) => ({
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
