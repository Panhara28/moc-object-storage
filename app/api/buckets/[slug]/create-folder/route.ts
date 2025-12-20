import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import * as fs from "fs/promises";
import path from "path";

function isSafeSegment(segment: string) {
  return (
    segment.length > 0 &&
    !segment.includes("..") &&
    !segment.includes("/") &&
    !segment.includes("\\")
  );
}

function assertPathInsideBase(base: string, target: string) {
  const baseResolved = path.resolve(base);
  const targetResolved = path.resolve(target);
  if (
    targetResolved !== baseResolved &&
    !targetResolved.startsWith(baseResolved + path.sep)
  ) {
    throw new Error("Resolved path escapes storage root");
  }
}

function getUniqueFolderName(baseName: string, siblingNames: string[]) {
  const siblings = new Set(siblingNames);

  if (!siblings.has(baseName)) {
    return baseName;
  }

  // Strip trailing " Copy" or " Copy(n)" if present to find the root
  const match = baseName.match(/^(.*?)(?: Copy(?:\((\d+)\))?)?$/);
  const root = match && match[1] ? match[1] : baseName;

  const copyName = `${root} Copy`;
  if (!siblings.has(copyName)) {
    return copyName;
  }

  let counter = 1;
  let candidate = `${root} Copy(${counter})`;
  while (siblings.has(candidate)) {
    counter += 1;
    candidate = `${root} Copy(${counter})`;
  }

  return candidate;
}

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

  if (!segments.every(isSafeSegment)) {
    throw new Error("Invalid folder path segment.");
  }

  return segments;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await authorize(req, "media-library", "create");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;

    const { slug } = await context.params;
    const body = await req.json();
    const { name, parentId = null } = body;

    // Validate folder name
    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Folder name is required." },
        { status: 400 }
      );
    }

    if (!isSafeSegment(name.trim())) {
      return NextResponse.json(
        { error: "Folder name contains invalid characters." },
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

    if (!isSafeSegment(bucket.name)) {
      return NextResponse.json(
        { error: "Invalid bucket name." },
        { status: 400 }
      );
    }

    // Resolve a unique folder name under the same parent
    const siblingFolders = await prisma.space.findMany({
      where: {
        bucketId: bucket.id,
        parentId: numericParentId,
        mediaId: null, // only folders
        isAvailable: { not: "REMOVE" }, // ignore removed folders so names can be reused
      },
      select: { name: true },
    });

    const uniqueFolderName = getUniqueFolderName(
      folderName,
      siblingFolders.map((s) => s.name)
    );

    // 2. Validate parent folder (must belong to the same bucket)
    let folderPath = uniqueFolderName;

    if (numericParentId !== null) {
      const parentFolder = await prisma.space.findFirst({
        where: {
          id: numericParentId,
          mediaId: null,
          isAvailable: { not: "REMOVE" },
        },
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
        parentSegments = await buildFolderPathSegments(parentFolder, bucket.id);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to resolve parent folder path.";
        const status = message === "Parent folder does not exist." ? 404 : 400;

        return NextResponse.json({ error: message }, { status });
      }

      folderPath = path.join(...parentSegments, uniqueFolderName);
    }

    if (!isSafeSegment(uniqueFolderName)) {
      return NextResponse.json(
        { error: "Folder name contains invalid characters." },
        { status: 400 }
      );
    }

    // 3. Create the folder in the database
    const newFolder = await prisma.space.create({
      data: {
        name: uniqueFolderName,
        parentId: numericParentId,
        bucketId: bucket.id,
        userId: user!.id,
        isAvailable: "AVAILABLE",
        uploadedAt: new Date(),
        mediaId: null,
      },
    });

    // 4. Create the folder on the filesystem
    const STORAGE_ROOT = process.env.STORAGE_ROOT || "C:/mnt/storage"; // Use Windows path if not set
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);

    // Ensure proper folder path construction
    const folderFullPath = path.join(bucketDir, folderPath);
    assertPathInsideBase(bucketDir, folderFullPath);

    // Debug the full folder path to be created

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
