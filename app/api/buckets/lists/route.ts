/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize, getAuthUser } from "@/lib/authorized";
import { format as formatDateFns } from "date-fns";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 10 ? 0 : 1)} ${units[i]}`;
}

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

    const buckets = await prisma.bucket.findMany({
      where: { isAvailable: "AVAILABLE", createdById: user.id },
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

    const bucketIds = buckets.map((b) => b.id);
    const mediaSizes = bucketIds.length
      ? await prisma.media.groupBy({
          by: ["bucketId"],
          _sum: { size: true },
          where: {
            isVisibility: { not: "REMOVE" },
            bucketId: { in: bucketIds },
          },
        })
      : [];

    const sizeMap = new Map<number, number>();
    mediaSizes.forEach((row) => {
      sizeMap.set(row.bucketId, row._sum.size ?? 0);
    });

    const sanitized = buckets.map((b) => {
      return {
        id: b.id,
        name: b.name,
        slug: b.slug,
        accessKeyName: b.accessKeyName,
        accessKeyId: b.accessKeyId,

        permission: b.permission,
        createdAt: formatDate(b.createdAt),
        updatedAt: formatDate(b.updatedAt),

        mediaCount: b._count.medias,
        folderCount: b._count.spaces,
        sizeBytes: sizeMap.get(b.id) ?? 0,
        sizeLabel: formatBytes(sizeMap.get(b.id) ?? 0),
      };
    });

    return NextResponse.json(
      {
        status: "ok",
        buckets: sanitized,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Bucket List Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch bucket list",
      },
      { status: 500 }
    );
  }
}
