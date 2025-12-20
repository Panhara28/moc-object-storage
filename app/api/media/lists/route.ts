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

export async function GET(req: NextRequest) {
  try {
    const uiHeader = req.headers.get("x-ui-request");
    const referer = req.headers.get("referer");
    const requestOrigin = new URL(req.url).origin;
    const refererOrigin = referer ? new URL(referer).origin : null;

    if (uiHeader?.toLowerCase() !== "true" && refererOrigin !== requestOrigin) {
      return NextResponse.json(
        { status: "error", message: "Forbidden" },
        { status: 403 }
      );
    }

    // ------------------------------------------------------------
    // 0. AUTHORIZATION
    // ------------------------------------------------------------
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

    // ------------------------------------------------------------
    // 1. QUERY PARAMS
    // ------------------------------------------------------------
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.max(1, Number(searchParams.get("limit") || 20));

    const search = searchParams.get("search") || ""; // by name
    const type = searchParams.get("type") || ""; // image | video | document | ...
    const pathFilter = searchParams.get("path") || "";
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const skip = (page - 1) * limit;

    // ------------------------------------------------------------
    // 2. BUILD WHERE CLAUSE
    // ------------------------------------------------------------
    const where: Prisma.MediaWhereInput = {
      uploadedById: user.id,
      isVisibility: "AVAILABLE",
    };

    // search by media filename
    if (search) {
      where.filename = { contains: search };
    }

    // filter by type
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

    // ------------------------------------------------------------
    // 3. FETCH DATA
    // ------------------------------------------------------------
    const media = await prisma.media.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // ------------------------------------------------------------
    // 4. TOTAL COUNT
    // ------------------------------------------------------------
    const total = await prisma.media.count({ where });
    // ------------------------------------------------------------
    // 5. RETURN CONSISTENT FORMAT
    // ------------------------------------------------------------
    return NextResponse.json({
      status: "ok",
      page,
      limit,
      total,
      data: media.map((m) => ({
        id: m.id,
        name: m.filename,
        type: m.fileType,
        url: m.url,
        size: m.size,
        createdAt: formatDate(m.createdAt),
        path: m.path,
      })),
    });
  } catch (e: unknown) {
    console.error("❌ Failed to fetch media:", e);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch media items",
      },
      { status: 500 }
    );
  }
}
