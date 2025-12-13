import { NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { getAuthUser } from "@/lib/auth";
import { authorize } from "@/lib/authorized";

export async function POST(req: Request) {
  try {
    const auth = await authorize(req, "media-library", "delete");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    const { folderId } = await req.json();
    const numericFolderId = Number(folderId);

    if (!folderId || Number.isNaN(numericFolderId)) {
      return NextResponse.json(
        { error: "folderId is required" },
        { status: 400 }
      );
    }

    // Fetch folder
    const folder = await prisma.space.findUnique({
      where: { id: numericFolderId },
    });

    if (!folder || folder.isAvailable !== "AVAILABLE") {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    // Ensure it's a folder (not a file)
    if (folder.mediaId !== null) {
      return NextResponse.json(
        { error: "You can only delete folders, not files" },
        { status: 400 }
      );
    }

    if (folder.userId !== user.id) {
      return NextResponse.json(
        { error: "Not authorized to delete this folder." },
        { status: 403 }
      );
    }

    // SOFT DELETE — set isAvailable = REMOVE
    await prisma.space.update({
      where: { id: numericFolderId },
      data: {
        isAvailable: "REMOVE",
      },
    });

    return NextResponse.json({
      message: "Folder deleted successfully (soft delete).",
    });
  } catch (error) {
    console.error("DELETE FOLDER ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
