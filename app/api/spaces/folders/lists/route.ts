import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import { prisma } from "@/lib/connection";

export async function GET(req: NextRequest) {
  try {
    const uiHeader = req.headers.get("x-ui-request");
    const referer = req.headers.get("referer");
    const requestOrigin = new URL(req.url).origin;
    const refererOrigin = referer ? new URL(referer).origin : null;

    if (uiHeader?.toLowerCase() !== "true" && refererOrigin !== requestOrigin) {
      return NextResponse.json(
        { status: "error", message: "Forbidden" },
        { status: 403 }
      );
    }

    const auth = await authorize(req, "media-library", "read");
    if (!auth.ok) {
      return NextResponse.json({ error: auth.message }, { status: auth.status });
    }
    const user = auth.user;

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
        slug: f.media.slug,
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
  } catch (error: unknown) {
    console.error("LIST FOLDER ERROR:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
