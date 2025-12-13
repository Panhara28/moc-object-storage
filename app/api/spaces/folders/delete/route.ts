import { NextResponse } from "next/server";
import { prisma } from "@/lib/connection";

export async function POST(req: Request) {
  try {
    const { folderId } = await req.json();

    if (!folderId) {
      return NextResponse.json(
        { error: "folderId is required" },
        { status: 400 }
      );
    }

    // Fetch folder
    const folder = await prisma.space.findUnique({
      where: { id: folderId },
    });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    // Ensure it's a folder (not a file)
    if (folder.mediaId !== null) {
      return NextResponse.json(
        { error: "You can only delete folders, not files" },
        { status: 400 }
      );
    }

    // SOFT DELETE — set status = REMOVE
    await prisma.space.update({
      where: { id: folderId },
      data: {
        status: "REMOVE",
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
