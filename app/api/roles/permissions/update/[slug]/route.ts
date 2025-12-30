import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

/* -----------------------------------------------------
   TYPES
----------------------------------------------------- */
interface PermissionUpdateItem {
  moduleId: number;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface RouteParams {
  slug: string;
}

interface UpdatePermissionsPayload {
  permissions: PermissionUpdateItem[];
}

/* -----------------------------------------------------
   PATCH /api/assign-permission/update/[slug]
----------------------------------------------------- */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<RouteParams> }
) {
  try {
    /* ------------------------------ AUTH -------------------------------- */
    const auth = await authorize(req, "roles", "update");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const auditInfo = getAuditRequestInfo(req);

    /* ------------------------------ PARAMS ------------------------------ */
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Missing role slug." },
        { status: 400 }
      );
    }

    /* ------------------------------ GET ROLE ---------------------------- */
    const role = await prisma.role.findUnique({
      where: { slug },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found." }, { status: 404 });
    }

    const roleId = role.id;

    /* ------------------------------ PARSE BODY -------------------------- */
    const body: UpdatePermissionsPayload = await req.json();

    if (!Array.isArray(body.permissions)) {
      return NextResponse.json(
        { error: "Permissions must be an array." },
        { status: 400 }
      );
    }

    const moduleIds = Array.from(
      new Set(body.permissions.map((perm) => Number(perm.moduleId)))
    );

    if (moduleIds.some((id) => Number.isNaN(id) || id <= 0)) {
      return NextResponse.json(
        { error: "Invalid module ID in permissions payload." },
        { status: 400 }
      );
    }

    const modules = await prisma.permissionModule.findMany({
      where: { id: { in: moduleIds } },
      select: { id: true },
    });

    const existingModuleIds = new Set(modules.map((module) => module.id));
    const missingModules = moduleIds.filter(
      (id) => !existingModuleIds.has(id)
    );
    if (missingModules.length > 0) {
      return NextResponse.json(
        {
          error: "Some modules were not found.",
          missingModuleIds: missingModules,
        },
        { status: 400 }
      );
    }

    /* ------------------------------ UPDATE PERMISSIONS ------------------ */
    const updateOps = body.permissions.map((perm) =>
      prisma.rolePermission.upsert({
        where: {
          roleId_moduleId: {
            roleId,
            moduleId: perm.moduleId,
          },
        },
        create: {
          roleId,
          moduleId: perm.moduleId,
          create: perm.create,
          read: perm.read,
          update: perm.update,
          delete: perm.delete,
        },
        update: {
          create: perm.create,
          read: perm.read,
          update: perm.update,
          delete: perm.delete,
        },
      })
    );

    await Promise.all(updateOps);

    await logAudit({
      ...auditInfo,
      actorId: user.id,
      action: "role.permissions.update",
      resourceType: "Role",
      resourceId: roleId,
      status: 200,
      metadata: {
        roleSlug: role.slug,
        updatedCount: body.permissions.length,
      },
    });

    return NextResponse.json({
      message: "Permissions updated successfully.",
      updatedCount: body.permissions.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected error while updating permissions.",
      },
      { status: 500 }
    );
  }
}
