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
    const user = auth.user;
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    const { slug } = await params;

    const bucket = await prisma.bucket.findFirst({
      where: { slug, createdById: user.id },
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
      where: { id: bucket.id },
      data: { isAvailable: "AVAILABLE" },
      select: { slug: true, name: true, isAvailable: true },
    });

    await logAudit({
      ...auditInfo,
      actorId: auth!.user!.id,
      action: "bucket.restore",
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
      message: "Bucket restored and uploads enabled.",
      bucket: updated,
    });
  } catch (error) {
    console.error("Restore bucket error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to restore bucket.",
      },
      { status: 500 }
    );
  }
}
