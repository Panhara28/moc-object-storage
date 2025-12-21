import { NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const auth = await authorize(req, "media-library", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    const { folderId, newParentId } = await req.json();

    if (!folderId || !newParentId) {
      return NextResponse.json(
        { error: "folderId and newParentId are required" },
        { status: 400 }
      );
    }

    // Fetch the folder
    const folder = await prisma.space.findUnique({
      where: { id: folderId },
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
    const target = await prisma.space.findUnique({
      where: { id: newParentId },
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
      where: { id: folderId },
      data: {
        parentId: newParentId,
      },
    });

    await logAudit({
      ...auditInfo,
      actorId: auth.user.id,
      action: "folder.move",
      resourceType: "Space",
      resourceId: folder.id,
      status: 200,
      metadata: {
        fromParentId: folder.parentId,
        toParentId: newParentId,
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
