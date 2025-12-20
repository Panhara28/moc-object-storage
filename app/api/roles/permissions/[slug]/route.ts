import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    /* --------------------------------------------------------------------------
       1. CHECK PERMISSION ─ (roles:read)
    -------------------------------------------------------------------------- */
    const auth = await authorize(req, "roles", "read");

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

    /* --------------------------------------------------------------------------
       2. EXTRACT ROLE SLUG
    -------------------------------------------------------------------------- */
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Role slug is required." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
       3. GET ROLE BY SLUG
    -------------------------------------------------------------------------- */
    const role = await prisma.role.findFirst({
      where: {
        slug,
        id: user.roleId ?? -1,
      },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found." }, { status: 404 });
    }

    /* --------------------------------------------------------------------------
       4. FETCH PERMISSIONS FOR ROLE ID
    -------------------------------------------------------------------------- */
    const permissions = await prisma.rolePermission.findMany({
      where: { roleId: role.id },
      include: { module: true },
      orderBy: {
        module: { name: "asc" },
      },
    });

    return NextResponse.json({
      role: {
        id: role.id,
        name: role.name,
        slug: role.slug,
      },
      permissions,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to fetch role permissions.",
      },
      { status: 500 }
    );
  }
}
