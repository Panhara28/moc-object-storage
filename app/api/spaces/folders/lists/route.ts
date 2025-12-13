import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/connection";

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const parentSlug = searchParams.get("parentSlug");

    let parentId: number | null = null;

    // --- RESOLVE PARENT FOLDER ---
    if (parentSlug) {
      const folder = await prisma.space.findUnique({
        where: { slug: parentSlug, isAvailable: "AVAILABLE" },
        select: { id: true, userId: true },
      });

      if (!folder) {
        return NextResponse.json(
          { error: "Folder not found." },
          { status: 404 }
        );
      }

      if (folder.userId !== user.id) {
        return NextResponse.json({ error: "Not authorized." }, { status: 403 });
      }

      parentId = folder.id;
    }

    // --- 1. FETCH FOLDERS ---
    const folders = await prisma.space.findMany({
      where: { parentId, userId: user.id, isAvailable: "AVAILABLE" },
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // --- 2. FETCH FILES ---
    const files = await prisma.mediaUploadDetail.findMany({
      where: { spaceId: parentId ?? undefined },
      select: {
        id: true,
        slug: true,
        media: {
          select: {
            url: true,
            filename: true,
            slug: true,
            fileType: true, // <-- CORRECT SOURCE
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // --- 3. MERGE + FIX FILE TYPE ---
    const data = [
      ...folders.map((f) => ({
        id: f.id,
        slug: f.slug,
        name: f.name,
        type: "folder",
      })),

      // FIXED: USE REAL fileType, NOT "image"
      ...files.map((f) => ({
        id: f.id,
        slug: f.slug,
        name: f.media.filename,
        type: f.media.fileType, // <-- FIXED!!!
        url: f.media.url,
      })),
    ];

    return NextResponse.json({
      status: "ok",
      parentSlug,
      parentId,
      count: data.length,
      data,
    });
  } catch (error: any) {
    console.error("LIST FOLDER ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
