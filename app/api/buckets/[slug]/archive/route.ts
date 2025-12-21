import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await authorize(req, "buckets", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

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

    if (bucket.isAvailable === "REMOVE") {
      return NextResponse.json(
        {
          status: "ok",
          message: "Bucket already archived.",
          bucket: bucket.name,
        },
        { status: 200 }
      );
    }

    const updated = await prisma.bucket.update({
      where: { slug },
      data: { isAvailable: "REMOVE" },
      select: { slug: true, name: true, isAvailable: true },
    });

    await logAudit({
      ...auditInfo,
      actorId: auth.user.id,
      action: "bucket.archive",
      resourceType: "Bucket",
      resourceId: bucket.id,
      status: 200,
      metadata: {
        bucketSlug: updated.slug,
        name: updated.name,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Bucket archived (uploads disabled).",
      bucket: updated,
    });
  } catch (error) {
    console.error("Archive bucket error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to archive bucket.",
      },
      { status: 500 }
    );
  }
}
