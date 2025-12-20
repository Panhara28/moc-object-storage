import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await authorize(req, "media-library", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const { slug } = await params;

    const bucket = await prisma.bucket.findUnique({
      where: { slug },
      select: { id: true, name: true, isAvailable: true },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found." },
        { status: 404 }
      );
    }

    if (bucket.isAvailable === "AVAILABLE") {
      return NextResponse.json(
        {
          status: "ok",
          message: "Bucket already available.",
          bucket: bucket.name,
        },
        { status: 200 }
      );
    }

    const updated = await prisma.bucket.update({
      where: { slug },
      data: { isAvailable: "AVAILABLE" },
      select: { slug: true, name: true, isAvailable: true },
    });

    return NextResponse.json({
      status: "ok",
      message: "Bucket restored and uploads enabled.",
      bucket: updated,
    });
  } catch (error) {
    console.error("Restore bucket error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to restore bucket.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
