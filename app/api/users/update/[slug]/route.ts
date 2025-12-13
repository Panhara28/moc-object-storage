// /api/news/update/[slug]/route.ts
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";
import { authorize, getAuthUser } from "@/lib/authorized";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // --------------------------------------------------------------------------
    // 1. AUTHORIZATION
    // --------------------------------------------------------------------------
    const auth = await authorize(req, "news", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    // --------------------------------------------------------------------------
    // 2. GET SLUG
    // --------------------------------------------------------------------------
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Missing news slug." },
        { status: 400 }
      );
    }

    // --------------------------------------------------------------------------
    // 3. FETCH PAYLOAD
    // --------------------------------------------------------------------------
    const data = await req.json();

    // --------------------------------------------------------------------------
    // 4. Check category exists (if provided)
    // --------------------------------------------------------------------------
    if (data.new_category_id) {
      const exists = await prisma.category.findUnique({
        where: { id: data.new_category_id },
      });

      if (!exists) {
        return NextResponse.json(
          {
            error: "Invalid category. Category does not exist.",
          },
          { status: 400 }
        );
      }
    }

    // --------------------------------------------------------------------------
    // 5. Get authenticated user (for audit)
    // --------------------------------------------------------------------------
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // --------------------------------------------------------------------------
    // 6. UPDATE NEWS
    // --------------------------------------------------------------------------
    const updated = await prisma.news.update({
      where: { slug },
      data: {
        // Core fields
        title: data.title ?? undefined,
        summary: data.summary ?? undefined,
        description: data.description ?? undefined, // JSON
        thumbnail: data.thumbnail ?? undefined,

        // Relations
        new_category_id: data.new_category_id ?? undefined,

        // Status
        status: data.status ?? undefined,
        published_date: data.published_date ?? undefined,
        published_datetime: data.published_datetime ?? undefined,

        // Audit
        updatedById: user.id,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        description: true,
        thumbnail: true,
        status: true,

        new_category_id: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },

        published_date: true,
        published_datetime: true,
        pageview: true,

        updatedBy: {
          select: { id: true, name: true },
        },

        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "News updated successfully.",
      data: updated,
    });
  } catch (error: any) {
    console.error("❌ NEWS UPDATE ERROR:", error);
    return NextResponse.json(
      {
        error: "Unexpected server error.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
