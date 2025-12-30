import { NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const auth = await authorize(req, "spaces", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const auditInfo = getAuditRequestInfo(req);

    const { folderId, newParentId } = await req.json();

    if (!folderId || !newParentId) {
      return NextResponse.json(
        { error: "folderId and newParentId are required" },
        { status: 400 }
      );
    }

    const numericFolderId = Number(folderId);
    const numericParentId = Number(newParentId);
    if (Number.isNaN(numericFolderId) || Number.isNaN(numericParentId)) {
      return NextResponse.json(
        { error: "folderId and newParentId must be numbers" },
        { status: 400 }
      );
    }

    // Fetch the folder
    const folder = await prisma.space.findFirst({
      where: {
        id: numericFolderId,
        isAvailable: "AVAILABLE",
        bucket: { createdById: user.id },
      },
      select: { id: true, parentId: true, bucketId: true, mediaId: true },
    });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    // Ensure the folder is a folder (not a file)
    if (folder.mediaId !== null) {
      return NextResponse.json(
        { error: "You can only move folders, not files" },
        { status: 400 }
      );
    }

    // Fetch the target folder (parent)
    const target = await prisma.space.findFirst({
      where: {
        id: numericParentId,
        isAvailable: "AVAILABLE",
        mediaId: null,
        bucketId: folder.bucketId,
        bucket: { createdById: user.id },
      },
      select: { id: true, bucketId: true },
    });

    if (!target) {
      return NextResponse.json(
        { error: "Target folder not found" },
        { status: 404 }
      );
    }

    // Prevent moving into itself
    if (folder.id === target.id) {
      return NextResponse.json(
        { error: "You cannot move a folder into itself" },
        { status: 400 }
      );
    }

    // Move the folder by updating its parentId
    await prisma.space.update({
      where: { id: folder.id },
      data: {
        parentId: target.id,
      },
    });

    await logAudit({
      ...auditInfo,
      actorId: user.id,
      action: "folder.move",
      resourceType: "Space",
      resourceId: folder.id,
      status: 200,
      metadata: {
        fromParentId: folder.parentId,
        toParentId: target.id,
        bucketId: folder.bucketId,
      },
    });

    return NextResponse.json({
      message: "Folder moved successfully",
    });
  } catch (error) {
    console.error("MOVE FOLDER ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
