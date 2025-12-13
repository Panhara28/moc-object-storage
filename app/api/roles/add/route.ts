import { authorize } from "@/lib/authorized";
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Permission check
    const auth = await authorize(req, "roles", "create");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const data = await req.json();

    if (!data.name) {
      return NextResponse.json(
        { error: "Role name is required." },
        { status: 400 }
      );
    }

    // Create Role
    const role = await prisma.role.create({
      data: {
        name: data.name,
        ...(data.description && { description: data.description }),
      },
    });

    // Create default permissions
    const modules = await prisma.permissionModule.findMany();

    await Promise.all(
      modules.map((mod) =>
        prisma.rolePermission.create({
          data: {
            roleId: role.id,
            moduleId: mod.id,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        })
      )
    );

    return NextResponse.json({
      message: "Role created successfully.",
      role,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while creating the role. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
