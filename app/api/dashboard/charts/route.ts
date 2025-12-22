import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";

const RANGE_MONTHS = {
  "12m": 12,
  "6m": 6,
  "3m": 3,
} as const;

type RangeKey = keyof typeof RANGE_MONTHS;

function toMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function toMonthLabel(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

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

    const { searchParams } = new URL(req.url);
    const rangeParam = searchParams.get("range");
    const rangeKey: RangeKey =
      rangeParam && Object.prototype.hasOwnProperty.call(RANGE_MONTHS, rangeParam)
        ? (rangeParam as RangeKey)
        : "12m";

    const months = RANGE_MONTHS[rangeKey];
    const now = new Date();
    const endMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startMonth = new Date(endMonth);
    startMonth.setMonth(startMonth.getMonth() - (months - 1));
    startMonth.setHours(0, 0, 0, 0);

    const monthKeys: string[] = [];
    const monthLabels: string[] = [];
    const cursor = new Date(startMonth);
    while (cursor <= endMonth) {
      monthKeys.push(toMonthKey(cursor));
      monthLabels.push(toMonthLabel(cursor));
      cursor.setMonth(cursor.getMonth() + 1);
    }

    const [mediaRows, typeGroups, scanGroups] = await Promise.all([
        prisma.media.findMany({
          where: {
            bucket: { createdById: user.id },
            isVisibility: { not: "REMOVE" },
            uploadedAt: { gte: startMonth },
        },
        select: { uploadedAt: true, size: true },
      }),
      prisma.media.groupBy({
        by: ["fileType"],
        where: {
          bucket: { createdById: user.id },
          isVisibility: { not: "REMOVE" },
        },
        _count: { _all: true },
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
    ]);

    const uploadsByMonth: Record<string, number> = {};
    const bytesByMonth: Record<string, number> = {};
    monthKeys.forEach((key) => {
      uploadsByMonth[key] = 0;
      bytesByMonth[key] = 0;
    });

    for (const media of mediaRows) {
      const key = toMonthKey(media.uploadedAt);
      if (key in uploadsByMonth) {
        uploadsByMonth[key] += 1;
        bytesByMonth[key] += media.size ?? 0;
      }
    }

    const timelineUploads = monthKeys.map((key) => uploadsByMonth[key] ?? 0);
    const timelineBytes = monthKeys.map((key) => bytesByMonth[key] ?? 0);

    const mediaTypeOrder = [
      "IMAGE",
      "VIDEO",
      "AUDIO",
      "PDF",
      "DOCUMENT",
      "OTHER",
    ];
    const mediaTypeLabels = [
      "Image",
      "Video",
      "Audio",
      "PDF",
      "Document",
      "Other",
    ];
    const mediaTypeCounts = mediaTypeOrder.map((type) => {
      const match = typeGroups.find((group) => group.fileType === type);
      return match?._count._all ?? 0;
    });

    const scanStatusOrder = ["PENDING", "CLEAN", "MALICIOUS", "FAILED"];
    const scanStatusLabels = ["Pending", "Clean", "Malicious", "Failed"];
    const scanStatusCounts = scanStatusOrder.map((status) => {
      const match = scanGroups.find((group) => group.scanStatus === status);
      return match?._count._all ?? 0;
    });

    return NextResponse.json({
      status: "ok",
      data: {
        timeline: {
          labels: monthLabels,
          uploads: timelineUploads,
          bytes: timelineBytes,
        },
        mediaTypes: {
          labels: mediaTypeLabels,
          counts: mediaTypeCounts,
        },
        scanStatuses: {
          labels: scanStatusLabels,
          counts: scanStatusCounts,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard chart error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch dashboard charts.",
      },
      { status: 500 }
    );
  }
}
