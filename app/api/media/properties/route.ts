import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorize(req, "media-library", "read");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const idParam = searchParams.get("id");
    const id =
      idParam === null || idParam === undefined ? NaN : Number(idParam);

    if (!slug && Number.isNaN(id)) {
      return NextResponse.json(
        { error: "slug or id is required" },
        { status: 400 }
      );
    }

    const media = await prisma.media.findUnique({
      where: slug ? { slug } : { id },
      select: {
        id: true,
        slug: true,
        filename: true,
        storedFilename: true,
        url: true,
        fileType: true,
        mimetype: true,
        extension: true,
        size: true,
        width: true,
        height: true,
        uploadedAt: true,
        createdAt: true,
        updatedAt: true,
        bucket: { select: { name: true, slug: true } },
      },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ media });
  } catch (error) {
    console.error("MEDIA PROPERTIES ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
