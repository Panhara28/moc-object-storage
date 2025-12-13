import { authorize } from "@/lib/authorized";
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
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
    const role = await prisma.role.findUnique({
      where: { slug },
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
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
