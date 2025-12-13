/* eslint-disable */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { getAuthUser } from "@/lib/authorized";

export async function POST(
  req: Request,
  context: { params: { slug: string } }
) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { slug } = await context.params;
    const body = await req.json();
    const { name, parentId = null } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Folder name is required." },
        { status: 400 }
      );
    }

    const folderName = name.trim();

    // -----------------------------------------------------
    // ✔ 1. Verify bucket exists (by slug)
    // -----------------------------------------------------
    const bucket = await prisma.bucket.findUnique({
      where: { slug },
    });

    if (!bucket) {
      return NextResponse.json({ error: "Bucket not found." }, { status: 404 });
    }

    // -----------------------------------------------------
    // ✔ 2. Validate parent folder (must belong to same bucket)
    // -----------------------------------------------------
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

      if (parent.bucketId !== bucket.id) {
        return NextResponse.json(
          { error: "Parent folder does not belong to this bucket." },
          { status: 400 }
        );
      }
    }

    // -----------------------------------------------------
    // ✔ 3. Create folder in this bucket
    // -----------------------------------------------------
    const newFolder = await prisma.space.create({
      data: {
        name: folderName,
        parentId,
        bucketId: bucket.id, // ⭐ IMPORTANT
        userId: user.id,
        isAvailable: "AVAILABLE",
        uploadedAt: new Date(),
        mediaId: null,
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
