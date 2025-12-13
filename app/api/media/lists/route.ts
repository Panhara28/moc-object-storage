/* eslint-disable */
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // ------------------------------------------------------------
    // 1. QUERY PARAMS
    // ------------------------------------------------------------
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const search = searchParams.get("search") || ""; // by name
    const type = searchParams.get("type") || ""; // image | video | document | ...

    const skip = (page - 1) * limit;

    // ------------------------------------------------------------
    // 2. BUILD WHERE CLAUSE
    // ------------------------------------------------------------
    const where: any = {};

    // search by media name
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    // filter by type
    if (type && type !== "all") {
      where.type = type;
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
        createdAt: m.createdAt,
      })),
    });
  } catch (e: any) {
    console.error("❌ Failed to fetch media:", e);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch media items",
        details: e.message,
      },
      { status: 500 }
    );
  }
}
