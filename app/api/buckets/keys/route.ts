import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { jsonError, uiContextForbidden } from "@/lib/api-errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const uiHeader = req.headers.get("x-ui-request");
    const referer = req.headers.get("referer");
    const requestOrigin = new URL(req.url).origin;
    const refererOrigin = referer ? new URL(referer).origin : null;

    if (uiHeader?.toLowerCase() !== "true" && refererOrigin !== requestOrigin) {
      return uiContextForbidden(req);
    }

    const auth = await authorize(req, "buckets", "read");
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
    const pageParam = Number(searchParams.get("page") ?? 1);
    const limitParam = Number(searchParams.get("limit") ?? 30);
    const page = pageParam > 0 ? Math.floor(pageParam) : 1;
    const limit = Math.min(Math.max(limitParam, 5), 100);
    const offset = (page - 1) * limit;

    const [keys, total] = await Promise.all([
      prisma.bucketApiKey.findMany({
        where: {
          bucket: {
            createdById: user.id,
            isAvailable: "AVAILABLE",
          },
        },
        include: {
          bucket: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.bucketApiKey.count({
        where: {
          bucket: {
            createdById: user.id,
            isAvailable: "AVAILABLE",
          },
        },
      }),
    ]);

    const sanitized = keys.map((key) => ({
      id: key.id,
      name: key.name,
      accessKeyId: key.accessKeyId,
      status: key.status,
      bucketId: key.bucketId,
      bucketSlug: key.bucket.slug,
      bucketName: key.bucket.name,
      createdAt: key.createdAt.toISOString(),
      lastUsedAt: key.lastUsedAt?.toISOString() ?? null,
      lastRotatedAt: key.lastRotatedAt?.toISOString() ?? null,
    }));

    return NextResponse.json(
      {
        status: "ok",
        keys: sanitized,
        meta: { page, limit, total },
      },
      { status: 200 }
    );
  } catch (error) {
    return jsonError(req, {
      status: 500,
      code: "BUCKET_KEYS_LIST_FAILED",
      message: "Failed to list API keys.",
      error,
    });
  }
}
