import { NextResponse } from "next/server";
import { prisma } from "@/lib/connection";

export async function POST(req: Request) {
  try {
    const { folderId, name } = await req.json();

    if (!folderId || !name) {
      return NextResponse.json(
        { error: "folderId and name are required" },
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

    // Prevent renaming files
    if (folder.mediaId !== null) {
      return NextResponse.json(
        { error: "You can only rename folders, not files" },
        { status: 400 }
      );
    }

    // Update name ONLY
    await prisma.space.update({
      where: { id: folderId },
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Folder renamed successfully",
      newName: name,
    });
  } catch (error) {
    console.error("RENAME FOLDER ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
