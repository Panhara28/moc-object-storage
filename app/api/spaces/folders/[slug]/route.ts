import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> } // ❌ remove Promise
) {
  try {
    const { slug } = await context.params;

    const auth = await authorize(req, "spaces", "read");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!slug) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    // Find folder by slug
    const folder = await prisma.space.findFirst({
      where: {
        slug,
        mediaId: null, // ensures it's a folder, not a file
        userId: user.id,
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
      },
      { status: 500 }
    );
  }
}
