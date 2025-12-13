import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/connection";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, parentId = null } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Folder name is required." },
        { status: 400 }
      );
    }

    const folderName = name.trim();

    /* -----------------------------------------------------
     * Validate Parent Folder
     * ----------------------------------------------------*/
    if (parentId !== null) {
      const parent = await prisma.space.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        return NextResponse.json(
          { error: "Parent folder does not exist." },
          { status: 404 }
        );
      }
    }

    /* -----------------------------------------------------
     * Create Folder (slug auto-created by Prisma)
     * ----------------------------------------------------*/
    const newFolder = await prisma.space.create({
      data: {
        name: folderName,
        parentId,
        userId: user.id,
        isAvailable: "AVAILABLE",
        uploadedAt: new Date(), // simple timestamp
        mediaId: null, // ensures it's a folder
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Folder created successfully.",
      data: newFolder,
    });
  } catch (error: any) {
    console.error("Folder creation error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to create folder" },
      { status: 500 }
    );
  }
}
