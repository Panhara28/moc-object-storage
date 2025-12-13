import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { authorize } from "@/lib/authorized";
import { prisma } from "@/lib/connection";

export async function POST(req: Request) {
  try {
    // Require permission to manage media folders
    const auth = await authorize(req, "media-library", "create");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const user = await getAuthUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, parentId = null, bucketId } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Folder name is required." },
        { status: 400 }
      );
    }

    const numericBucketId = Number(bucketId);
    const numericParentId =
      parentId === null || parentId === undefined ? null : Number(parentId);

    if (!bucketId || Number.isNaN(numericBucketId)) {
      return NextResponse.json(
        { error: "bucketId is required." },
        { status: 400 }
      );
    }

    const bucket = await prisma.bucket.findUnique({
      where: { id: numericBucketId },
    });

    if (!bucket || bucket.isAvailable !== "AVAILABLE") {
      return NextResponse.json(
        { error: "Bucket not found or unavailable." },
        { status: 404 }
      );
    }

    const folderName = name.trim();

    /* -----------------------------------------------------
     * Validate Parent Folder
     * ----------------------------------------------------*/
    if (numericParentId !== null) {
      const parent = await prisma.space.findUnique({
        where: { id: numericParentId },
      });

      if (!parent || parent.bucketId !== bucket.id) {
        return NextResponse.json(
          { error: "Parent folder does not exist in this bucket." },
          { status: 404 }
        );
      }

      if (parent.userId !== user.id) {
        return NextResponse.json(
          { error: "Not authorized to use this parent folder." },
          { status: 403 }
        );
      }
    }

    // Prevent duplicate folder names under the same parent
    const duplicate = await prisma.space.findFirst({
      where: {
        name: folderName,
        parentId: numericParentId,
        bucketId: bucket.id,
        userId: user.id,
        isAvailable: "AVAILABLE",
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "A folder with this name already exists here." },
        { status: 409 }
      );
    }

    /* -----------------------------------------------------
     * Create Folder (slug auto-created by Prisma)
     * ----------------------------------------------------*/
    const newFolder = await prisma.space.create({
      data: {
        name: folderName,
        parentId: numericParentId,
        bucketId: bucket.id,
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
  } catch (error: unknown) {
    console.error("Folder creation error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create folder",
      },
      { status: 500 }
    );
  }
}
