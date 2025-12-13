import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";

export async function POST(req: Request) {
  try {
    /* --------------------------------------------------------------------------
     * 1. AUTHORIZATION — REQUIRE permissions.create
     * -------------------------------------------------------------------------- */
    const auth = await authorize(req, "permissions", "create");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    /* --------------------------------------------------------------------------
     * 2. PARSE BODY
     * -------------------------------------------------------------------------- */
    const data = await req.json();

    if (!data.name || !data.label) {
      return NextResponse.json(
        { error: "Both 'name' and 'label' are required fields." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 3. CREATE PERMISSION MODULE
     * -------------------------------------------------------------------------- */
    const permissionModule = await prisma.permissionModule.create({
      data: {
        name: data.name,
        label: data.label,
        description: data.description ?? null,
      },
    });

    /* --------------------------------------------------------------------------
     * 4. FETCH ALL ROLES
     * -------------------------------------------------------------------------- */
    const roles = await prisma.role.findMany();

    if (!roles.length) {
      return NextResponse.json({
        message:
          "Permission module created. No roles found, so no role_permissions created.",
        permissionModule,
      });
    }

    /* --------------------------------------------------------------------------
     * 5. ASSIGN DEFAULT ROLE PERMISSIONS TO ALL ROLES
     * -------------------------------------------------------------------------- */
    const rows = roles.map((role) =>
      prisma.rolePermission.create({
        data: {
          roleId: role.id,
          moduleId: permissionModule.id, // FIXED HERE
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      })
    );

    await Promise.all(rows);

    return NextResponse.json({
      message:
        "Permission module created successfully and default permissions added to all roles.",
      permissionModule,
    });

  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Failed to create permission module",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
