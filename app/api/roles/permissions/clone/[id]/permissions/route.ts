import { authorize } from "@/lib/authorized";
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

/* -------------------------------------------
   TYPES
------------------------------------------- */
interface ClonePermissionPayload {
  fromRoleId: number;
}

interface RouteParams {
  id: string; // Next.js always passes string
}

export async function POST(
  req: Request,
  context: { params: Promise<RouteParams> } // ✔ ESLint-safe
) {
  try {
    /* -------------------------------------------
       1. AUTH CHECK
    ------------------------------------------- */
    const auth = await authorize(req, "roles", "update");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    /* -------------------------------------------
       2. PARAM VALIDATION
    ------------------------------------------- */
    const { id } = await context.params;
    const targetRoleId = Number(id);

    if (Number.isNaN(targetRoleId)) {
      return NextResponse.json(
        { error: "Invalid target role ID." },
        { status: 400 }
      );
    }

    /* -------------------------------------------
       3. BODY VALIDATION
    ------------------------------------------- */
    const body: ClonePermissionPayload = await req.json();

    if (!body?.fromRoleId) {
      return NextResponse.json(
        { error: "The field 'fromRoleId' is required." },
        { status: 400 }
      );
    }

    const fromRoleId = Number(body.fromRoleId);

    if (Number.isNaN(fromRoleId)) {
      return NextResponse.json(
        { error: "Invalid 'fromRoleId'." },
        { status: 400 }
      );
    }

    if (fromRoleId === targetRoleId) {
      return NextResponse.json(
        { error: "Cannot clone permissions into the same role." },
        { status: 400 }
      );
    }

    /* -------------------------------------------
       4. FETCH SOURCE PERMISSIONS
    ------------------------------------------- */
    const sourcePermissions = await prisma.rolePermission.findMany({
      where: { roleId: fromRoleId },
    });

    if (sourcePermissions.length === 0) {
      return NextResponse.json(
        { error: "The source role has no permissions to clone." },
        { status: 404 }
      );
    }

    /* -------------------------------------------
       5. CLONE PERMISSIONS
    ------------------------------------------- */
    const updateOperations = sourcePermissions.map((perm) =>
      prisma.rolePermission.update({
        where: {
          roleId_moduleId: {
            roleId: targetRoleId,
            moduleId: perm.moduleId,
          },
        },
        data: {
          create: perm.create,
          read: perm.read,
          update: perm.update,
          delete: perm.delete,
        },
      })
    );

    await Promise.all(updateOperations);

    /* -------------------------------------------
       6. SUCCESS
    ------------------------------------------- */
    return NextResponse.json({
      message: "Permissions cloned successfully.",
      fromRoleId,
      toRoleId: targetRoleId,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred.";

    return NextResponse.json(
      {
        error: "An unexpected error occurred while cloning permissions.",
        details: message,
      },
      { status: 500 }
    );
  }
}
