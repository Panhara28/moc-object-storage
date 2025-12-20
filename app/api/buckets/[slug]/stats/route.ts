import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
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

    const { slug } = await params;

    const bucket = await prisma.bucket.findUnique({
      where: { slug },
      select: { id: true, name: true, isAvailable: true, createdById: true },
    });

    if (!bucket || bucket.createdById !== user.id) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found." },
        { status: 404 }
      );
    }

    const [mediaAgg, latestUpload] = await Promise.all([
      prisma.media.aggregate({
        where: { bucketId: bucket.id },
        _count: { _all: true },
        _sum: { size: true },
      }),
      prisma.media.findFirst({
        where: { bucketId: bucket.id },
        orderBy: { uploadedAt: "desc" },
        select: { uploadedAt: true },
      }),
    ]);

    return NextResponse.json({
      status: "ok",
      bucket: bucket.name,
      isAvailable: bucket.isAvailable,
      mediaCount: mediaAgg._count._all,
      totalBytes: mediaAgg._sum.size ?? 0,
      lastUpload: latestUpload?.uploadedAt ?? null,
    });
  } catch (error) {
    console.error("Bucket stats error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch bucket stats.",
      },
      { status: 500 }
    );
  }
}
