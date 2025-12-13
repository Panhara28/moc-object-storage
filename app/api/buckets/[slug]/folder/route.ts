/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(req.url);

    const parentSlug = searchParams.get("parentSlug") || null;

    // find bucket
    const bucket = await prisma.bucket.findUnique({
      where: { slug },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    const folders = await prisma.space.findMany({
      where: {
        bucketId: bucket.id,
        parentId: parentSlug ? undefined : null,
        ...(parentSlug && {
          parent: { slug: parentSlug },
        }),
        isAvailable: "AVAILABLE",
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      status: "ok",
      data: folders.map((f) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        type: "folder",
        parentId: f.parentId,
        createdAt: f.createdAt,
      })),
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
