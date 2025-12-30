import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";

const SYSTEM_PREFIXES = ["bucket.", "role.", "permission.", "user."] as const;
const USER_PREFIXES = ["media.", "folder.", "auth."] as const;

type ActivityType = "system" | "user";

function getPrefixes(type: ActivityType) {
  return type === "system" ? SYSTEM_PREFIXES : USER_PREFIXES;
}

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
    const typeParam = searchParams.get("type");
    const type: ActivityType = typeParam === "system" ? "system" : "user";
    const limitParam = Number(searchParams.get("limit") ?? 8);
    const limit = Number.isFinite(limitParam)
      ? Math.min(Math.max(limitParam, 1), 20)
      : 8;

    const prefixes = getPrefixes(type);

    const logs = await prisma.auditLog.findMany({
      where: {
        actorId: user.id,
        OR: prefixes.map((prefix) => ({
          action: { startsWith: prefix },
        })),
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
    console.error("Dashboard activity error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch dashboard activity.",
      },
      { status: 500 }
    );
  }
}
