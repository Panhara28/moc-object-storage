import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { getApiAuthentication } from "@/lib/api-auth";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

type SpaceNode = {
  id: number;
  name: string;
  parentId: number | null;
  bucketId: number;
};

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

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin" || process.platform === "win32") {
    return path.join(process.cwd(), "storage");
  }
  return "/mnt/storage";
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getApiAuthentication(req);
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const key = auth.key;
    const bucket = await prisma.bucket.findUnique({
      where: { id: key.bucketId, isAvailable: "AVAILABLE" },
      select: { id: true, name: true, slug: true, createdById: true },
    });

    if (!bucket || !isSafeSegment(bucket.name)) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const name = (body.name as string | undefined)?.trim();
    const parentIdRaw = body.parentId;
    if (!name) {
      return NextResponse.json(
        { status: "error", message: "Folder name is required." },
        { status: 400 }
      );
    }
    if (!isSafeSegment(name)) {
      return NextResponse.json(
        { status: "error", message: "Folder name contains invalid characters." },
        { status: 400 }
      );
    }

    const numericParentId =
      parentIdRaw === undefined || parentIdRaw === null
        ? null
        : Number(parentIdRaw);
    if (numericParentId !== null && Number.isNaN(numericParentId)) {
      return NextResponse.json(
        { status: "error", message: "parentId must be a number when provided." },
        { status: 400 }
      );
    }

    const siblingFolders = await prisma.space.findMany({
      where: {
        bucketId: bucket.id,
        parentId: numericParentId,
        mediaId: null,
        isAvailable: { not: "REMOVE" },
      },
      select: { name: true },
    });

    const uniqueFolderName = getUniqueFolderName(
      name,
      siblingFolders.map((s) => s.name)
    );

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
          { status: "error", message: "Parent folder does not exist." },
          { status: 404 }
        );
      }
      if (parentFolder.bucketId !== bucket.id) {
        return NextResponse.json(
          { status: "error", message: "Parent folder does not belong to this bucket." },
          { status: 400 }
        );
      }

      let parentSegments: string[] = [];
      try {
        parentSegments = await buildFolderPathSegments(parentFolder, bucket.id);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to resolve parent folder path.";
        const status = message === "Parent folder does not exist." ? 404 : 400;
        return NextResponse.json({ status: "error", message }, { status });
      }

      folderPath = path.join(...parentSegments, uniqueFolderName);
    }

    const newFolder = await prisma.space.create({
      data: {
        name: uniqueFolderName,
        parentId: numericParentId,
        bucketId: bucket.id,
        userId: bucket.createdById,
        isAvailable: "AVAILABLE",
        uploadedAt: new Date(),
        mediaId: null,
      },
    });

    const storageRoot = getStorageRoot();
    const bucketDir = path.join(storageRoot, bucket.name);
    assertPathInsideBase(storageRoot, bucketDir);
    const folderFullPath = path.join(bucketDir, folderPath);
    assertPathInsideBase(bucketDir, folderFullPath);
    await fs.mkdir(folderFullPath, { recursive: true });

    await logAudit({
      ...getAuditRequestInfo(req),
      actorId: null,
      action: "external.folder.create",
      resourceType: "Space",
      resourceId: newFolder.id,
      status: 200,
      metadata: {
        bucketId: bucket.id,
        bucketSlug: bucket.slug,
        parentId: numericParentId,
        name: newFolder.name,
        path: folderPath,
        accessKeyId: key.accessKeyId,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Folder created successfully.",
      data: newFolder,
    });
  } catch (error) {
    console.error("External folder creation error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to create folder",
      },
      { status: 500 }
    );
  }
}
