// app/api/buckets/[slug]/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  try {
    const auth = await authorize(req, "media-library", "delete");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    // Ensure bucket exists
    const bucket = await prisma.bucket.findUnique({ where: { slug } });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    // Soft delete the bucket
    const updated = await prisma.bucket.update({
      where: { slug },
      data: { isAvailable: "REMOVE" },
    });

    return NextResponse.json({
      status: "ok",
      message: "Bucket removed successfully",
      bucket: updated,
    });
  } catch (err: any) {
    console.error("Bucket Delete Error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Failed to delete bucket",
      },
      { status: 500 }
    );
  }
}
