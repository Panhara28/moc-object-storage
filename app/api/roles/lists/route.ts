import { authorize } from "@/lib/authorized";
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";
import { Prisma } from "@/lib/generated/prisma";

export async function GET(req: Request) {
  try {
    // --------------------------------------------------------------------------
    // 1. AUTHORIZATION CHECK — REQUIRE roles.read
    // --------------------------------------------------------------------------
    const auth = await authorize(req, "roles", "read");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    // --------------------------------------------------------------------------
    // 2. QUERY PARAMS
    // --------------------------------------------------------------------------
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // --------------------------------------------------------------------------
    // 3. WHERE CLAUSE
    // --------------------------------------------------------------------------
    const where: Prisma.RoleWhereInput = {};

    if (search) {
      where.name = {
        contains: search,
      };
    }

    // --------------------------------------------------------------------------
    // 4. FETCH ROLES
    // --------------------------------------------------------------------------
    const roles = await prisma.role.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "asc" },
      include: {
        permissions: {
          select: {
            moduleId: true,
            create: true,
            read: true,
            update: true,
            delete: true,
            module: { select: { name: true, label: true } },
          },
        },
        users: {
          select: {
            id: true,
            fullNameEn: true,
            profilePicture: true,
            slug: true,
          },
        },
      },
    });

    // --------------------------------------------------------------------------
    // 5. TOTAL COUNT
    // --------------------------------------------------------------------------
    const total = await prisma.role.count({ where });

    // --------------------------------------------------------------------------
    // 6. FORMAT RESPONSE (INCLUDES users now)
    // --------------------------------------------------------------------------
    return NextResponse.json({
      status: "ok",
      page,
      limit,
      total,
      data: roles.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        description: r.description ?? null,
        createdAt: r.createdAt,

        // ⭐ ADDED FOR DynamicTable (avatar column)
        users: r.users.map((u) => ({
          id: u.id,
          fullNameEn: u.fullNameEn,
          profilePicture: u.profilePicture,
          slug: u.slug,
        })),

        // permissions
        permissions: r.permissions.map((p) => ({
          moduleId: p.moduleId,
          moduleName: p.module?.name || null,
          moduleLabel: p.module?.label || null,
          create: p.create,
          read: p.read,
          update: p.update,
          delete: p.delete,
        })),
      })),
    });
  } catch (error: unknown) {
    console.error("❌ Failed to fetch roles:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch roles",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
