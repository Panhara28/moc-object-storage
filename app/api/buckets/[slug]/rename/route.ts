// app/api/buckets/[slug]/rename/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  try {
    // Authorization check
    const auth = await authorize(req, "media-library", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const { name } = await req.json();

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { status: "error", message: "Bucket name is required" },
        { status: 400 }
      );
    }

    // Ensure bucket exists
    const bucketExists = await prisma.bucket.findUnique({
      where: { slug },
    });

    if (!bucketExists) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    // Update bucket name
    const updatedBucket = await prisma.bucket.update({
      where: { slug },
      data: { name },
    });

    return NextResponse.json({
      status: "ok",
      message: "Bucket renamed successfully",
      bucket: updatedBucket,
    });
  } catch (err: any) {
    console.error("Rename Bucket Error:", err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
