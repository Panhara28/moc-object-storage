import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { getAuthUser } from "@/lib/authorized";
import * as fs from "fs/promises";
import path from "path";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
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

    const numericParentId =
      parentId === null || parentId === undefined ? null : Number(parentId);

    if (numericParentId !== null && Number.isNaN(numericParentId)) {
      return NextResponse.json(
        { error: "parentId must be a number when provided." },
        { status: 400 }
      );
    }

    const folderName = name.trim();

    // -----------------------------------------------------
    // ✔ 1. Verify bucket exists (by slug)
    // -----------------------------------------------------
    const bucket = await prisma.bucket.findUnique({
      where: { slug, isAvailable: "AVAILABLE" },
    });

    if (!bucket) {
      return NextResponse.json(
        { error: "Bucket not found or unavailable." },
        { status: 404 }
      );
    }

    // -----------------------------------------------------
    // ✔ 2. Validate parent folder (must belong to same bucket)
    // -----------------------------------------------------
    if (numericParentId !== null) {
      const parent = await prisma.space.findUnique({
        where: { id: numericParentId },
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
    // ✔ 3. Create folder in this bucket (Database)
    // -----------------------------------------------------
    const newFolder = await prisma.space.create({
      data: {
        name: folderName,
        parentId: numericParentId,
        bucketId: bucket.id,
        userId: user.id,
        isAvailable: "AVAILABLE",
        uploadedAt: new Date(),
        mediaId: null,
      },
    });

    // -----------------------------------------------------
    // ✔ 4. Create Folder on the Filesystem
    // -----------------------------------------------------
    const STORAGE_ROOT = process.env.STORAGE_ROOT || "/mnt/storage";
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);

    // If there’s a parent folder, append that to the path.
    let folderPath = folderName;
    if (numericParentId !== null) {
      const parentFolder = await prisma.space.findUnique({
        where: { id: numericParentId },
      });
      folderPath = path.join(parentFolder!.name, folderName);
    }

    const folderFullPath = path.join(bucketDir, folderPath);

    // Create the folder on the filesystem
    await fs.mkdir(folderFullPath, { recursive: true });

    return NextResponse.json({
      status: "ok",
      message: "Folder created successfully.",
      data: newFolder,
    });
  } catch (error: unknown) {
    console.error("Folder creation error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create folder",
      },
      { status: 500 }
    );
  }
}
