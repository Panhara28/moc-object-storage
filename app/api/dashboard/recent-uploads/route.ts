import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";

const ACTIONS = ["media.upload", "folder.create"];

export async function GET(req: NextRequest) {
  try {
    const auth = await authorize(req, "media-library", "read");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const user = auth.user;
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limitParam = Number(searchParams.get("limit") ?? 15);
    const limit = Number.isFinite(limitParam)
      ? Math.min(Math.max(limitParam, 1), 50)
      : 15;

    const logs = await prisma.auditLog.findMany({
      where: {
        actorId: user.id,
        action: { in: ACTIONS },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        actor: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
            role: { select: { name: true } },
          },
        },
      },
    });

    return NextResponse.json({
      status: "ok",
      data: logs.map((log) => ({
        id: log.id,
        action: log.action,
        resourceType: log.resourceType,
        resourceId: log.resourceId,
        status: log.status,
        createdAt: log.createdAt,
        metadata: log.metadata,
        actor: log.actor
          ? {
              id: log.actor.id,
              name: log.actor.name,
              profilePicture: log.actor.profilePicture || null,
              role: log.actor.role?.name ?? null,
            }
          : null,
      })),
    });
  } catch (error) {
    console.error("Recent uploads error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch recent uploads.",
      },
      { status: 500 }
    );
  }
}
