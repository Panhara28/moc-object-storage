// app/api/buckets/[slug]/update-permission/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const auth = await authorize(req, "media-library", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const { permission } = await req.json();

    if (!permission) {
      return NextResponse.json(
        { status: "error", message: "Permission is required" },
        { status: 400 }
      );
    }

    const bucket = await prisma.bucket.update({
      where: { slug },
      data: { permission },
      select: {
        id: true,
        name: true,
        slug: true,
        accessKeyId: true,
        permission: true,
        isAvailable: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Permission updated successfully",
      bucket,
    });
  } catch (err: unknown) {
    console.error("Update Permission Error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err instanceof Error ? err.message : "Failed to update permission",
      },
      { status: 500 }
    );
  }
}
