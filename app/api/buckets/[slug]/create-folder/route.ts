import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { getAuthUser } from "@/lib/authorized";
import * as fs from "fs/promises";
import path from "path";

type SpaceNode = {
  id: number;
  name: string;
  parentId: number | null;
  bucketId: number;
};

async function buildFolderPathSegments(
  folder: SpaceNode,
  bucketId: number
): Promise<string[]> {
  const segments = [folder.name];
  let currentParentId = folder.parentId;

  while (currentParentId !== null) {
    const ancestor = await prisma.space.findUnique({
      where: { id: currentParentId },
      select: { id: true, name: true, parentId: true, bucketId: true },
    });

    if (!ancestor) {
      throw new Error("Parent folder does not exist.");
    }

    if (ancestor.bucketId !== bucketId) {
      throw new Error("Parent folder does not belong to this bucket.");
    }

    segments.unshift(ancestor.name);
    currentParentId = ancestor.parentId;
  }

  return segments;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // Get authenticated user
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

    console.log(
      "Received request to create folder:",
      name,
      "under parentId:",
      parentId
    );

    // Validate folder name
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

    // 1. Verify the bucket exists (by slug)
    const bucket = await prisma.bucket.findUnique({
      where: { slug, isAvailable: "AVAILABLE" },
    });

    if (!bucket) {
      return NextResponse.json(
        { error: "Bucket not found or unavailable." },
        { status: 404 }
      );
    }

    console.log("Bucket found:", bucket.name);

    // 2. Validate parent folder (must belong to the same bucket)
    let folderPath = folderName;

    if (numericParentId !== null) {
      const parentFolder = await prisma.space.findUnique({
        where: { id: numericParentId },
        select: { id: true, name: true, parentId: true, bucketId: true },
      });

      if (!parentFolder) {
        return NextResponse.json(
          { error: "Parent folder does not exist." },
          { status: 404 }
        );
      }

      if (parentFolder.bucketId !== bucket.id) {
        return NextResponse.json(
          { error: "Parent folder does not belong to this bucket." },
          { status: 400 }
        );
      }

      // Append full parent folder hierarchy to path
      let parentSegments: string[] = [];

      try {
        parentSegments = await buildFolderPathSegments(
          parentFolder,
          bucket.id
        );
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to resolve parent folder path.";
        const status =
          message === "Parent folder does not exist." ? 404 : 400;

        return NextResponse.json({ error: message }, { status });
      }

      folderPath = path.join(...parentSegments, folderName);
      console.log("Parent folder found. Updated folder path:", folderPath);
    }

    // 3. Create the folder in the database
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

    console.log("Folder created in database:", newFolder);

    // 4. Create the folder on the filesystem
    const STORAGE_ROOT = process.env.STORAGE_ROOT || "C:/mnt/storage"; // Use Windows path if not set
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);

    // Ensure proper folder path construction
    const folderFullPath = path.join(bucketDir, folderPath);

    // Debug the full folder path to be created
    console.log("Full path to be created:", folderFullPath);

    // Create the folder on the filesystem (ensure parent directories exist)
    await fs.mkdir(folderFullPath, { recursive: true });

    // 5. Response
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
