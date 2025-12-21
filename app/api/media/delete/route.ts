import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const auth = await authorize(req, "media-library", "delete");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    const body = await req.json();
    const { slug, id } = body;

    const where = slug ? { slug } : id ? { id: Number(id) } : null;
    if (!where) {
      return NextResponse.json(
        { error: "slug or id is required" },
        { status: 400 }
      );
    }

    const media = await prisma.media.findFirst({
      where,
      select: { id: true, slug: true },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    await prisma.media.update({
      where: { id: media.id },
      data: { isVisibility: "REMOVE" },
    });

    await logAudit({
      ...auditInfo,
      actorId: auth.user.id,
      action: "media.delete",
      resourceType: "Media",
      resourceId: media.id,
      status: 200,
      metadata: { slug: media.slug },
    });

    return NextResponse.json({ message: "Media removed", slug: media.slug });
  } catch (error) {
    console.error("MEDIA DELETE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
