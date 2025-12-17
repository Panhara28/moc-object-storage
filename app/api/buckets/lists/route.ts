/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize, getAuthUser } from "@/lib/authorized";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 10 ? 0 : 1)} ${units[i]}`;
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

    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [buckets, mediaSizes] = await Promise.all([
      prisma.bucket.findMany({
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
      }),
      prisma.media.groupBy({
        by: ["bucketId"],
        _sum: { size: true },
        where: { isVisibility: { not: "REMOVE" } },
      }),
    ]);

    const sizeMap = new Map<number, number>();
    mediaSizes.forEach((row) => {
      sizeMap.set(row.bucketId, row._sum.size ?? 0);
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
      sizeBytes: sizeMap.get(b.id) ?? 0,
      sizeLabel: formatBytes(sizeMap.get(b.id) ?? 0),
    }));

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
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
