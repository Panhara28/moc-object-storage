/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize, getAuthUser } from "@/lib/authorized";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorize(req, "media-library", "read");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ⭐ Filter only available buckets
    const buckets = await prisma.bucket.findMany({
      where: { isAvailable: "AVAILABLE" },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            medias: true,
            spaces: true,
          },
        },
      },
    });

    const sanitized = buckets.map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      accessKeyName: b.accessKeyName,
      accessKeyId: b.accessKeyId,

      permission: b.permission,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,

      mediaCount: b._count.medias,
      folderCount: b._count.spaces,
    }));

    return NextResponse.json(
      {
        status: "ok",
        buckets: sanitized,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("❌ Bucket List Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch bucket list",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
