import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> } // ❌ remove Promise
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    // Find folder by slug
    const folder = await prisma.space.findFirst({
      where: {
        slug,
        mediaId: null, // ensures it's a folder, not a file
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found." }, { status: 404 });
    }

    return NextResponse.json({
      status: "ok",
      data: folder,
    });
  } catch (err: unknown) {
    console.error("GET /spaces/folders/[slug] error:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
