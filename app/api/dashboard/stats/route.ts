import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";

export async function GET(req: NextRequest) {
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

    const [bucketCount, mediaAgg, latestUpload, scanGroups, pendingItems] =
      await Promise.all([
        prisma.bucket.count({
          where: {
            createdById: user.id,
            isAvailable: { not: "REMOVE" },
          },
        }),
        prisma.media.aggregate({
          where: {
            bucket: { createdById: user.id },
            isVisibility: { not: "REMOVE" },
          },
          _count: { _all: true },
          _sum: { size: true },
        }),
        prisma.media.findFirst({
          where: {
            bucket: { createdById: user.id },
            isVisibility: { not: "REMOVE" },
          },
          orderBy: { uploadedAt: "desc" },
          select: { uploadedAt: true },
        }),
        prisma.media.groupBy({
          by: ["scanStatus"],
          where: {
            bucket: { createdById: user.id },
            OR: [
              { isVisibility: { not: "REMOVE" } },
              { scanStatus: "MALICIOUS" },
            ],
          },
          _count: { _all: true },
        }),
        prisma.media.findMany({
          where: {
            bucket: { createdById: user.id },
            scanStatus: "PENDING",
            isVisibility: { not: "REMOVE" },
          },
          orderBy: { uploadedAt: "desc" },
          take: 3,
          select: {
            id: true,
            slug: true,
            filename: true,
            bucket: { select: { slug: true, name: true } },
          },
        }),
      ]);

    const scanCounts = scanGroups.reduce<Record<string, number>>(
      (acc, group) => {
        acc[group.scanStatus] = group._count._all;
        return acc;
      },
      {}
    );

    return NextResponse.json({
      status: "ok",
      data: {
        bucketCount,
        mediaCount: mediaAgg._count._all,
        totalBytes: mediaAgg._sum.size ?? 0,
        pendingScans: scanCounts.PENDING ?? 0,
        failedScans: scanCounts.FAILED ?? 0,
        maliciousScans: scanCounts.MALICIOUS ?? 0,
        lastUploadAt: latestUpload?.uploadedAt ?? null,
        pendingItems: pendingItems.map((item) => ({
          id: item.id,
          slug: item.slug,
          filename: item.filename,
          bucketSlug: item.bucket.slug,
          bucketName: item.bucket.name,
        })),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch dashboard stats.",
      },
      { status: 500 }
    );
  }
}
