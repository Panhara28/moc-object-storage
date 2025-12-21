// /api/assign-role/update/[slug]/route.ts

import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> } // ❌ remove Promise
) {
  try {
    const auth = await authorize(req, "users", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    const { slug } = await context.params;
    const { users: selectedUserIds } = await req.json();

    if (!Array.isArray(selectedUserIds)) {
      return NextResponse.json(
        { error: "Field 'users' must be an array of user IDs." },
        { status: 400 }
      );
    }

    const numericUserIds = selectedUserIds
      .map((id) => Number(id))
      .filter((id): id is number => Number.isInteger(id));

    // 1. Get the role
    const role = await prisma.role.findUnique({
      where: { slug },
    });

    if (!role) {
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }

    // 2. Get ALL users currently assigned to this role
    const existingAssignedUsers = await prisma.user.findMany({
      where: { roleId: role.id },
      select: { id: true },
    });

    const existingIds = existingAssignedUsers.map((u) => u.id);

    // 3. Users to REMOVE (those who had this role but not selected now)
    const removeIds = existingIds.filter((id) => !numericUserIds.includes(id));

    // 4. Users to ADD (selected but not previously assigned)
    const addIds = numericUserIds.filter(
      (id: number) => !existingIds.includes(id)
    );

    // 5. UPDATE DB (remove role)
    if (removeIds.length) {
      await prisma.user.updateMany({
        where: { id: { in: removeIds } },
        data: { roleId: null },
      });
    }

    // 6. UPDATE DB (assign role)
    if (addIds.length) {
      await prisma.user.updateMany({
        where: { id: { in: addIds } },
        data: { roleId: role.id },
      });
    }

    await logAudit({
      ...auditInfo,
      actorId: auth.user.id,
      action: "role.assign",
      resourceType: "Role",
      resourceId: role.id,
      status: 200,
      metadata: {
        roleSlug: role.slug,
        addedUserIds: addIds,
        removedUserIds: removeIds,
      },
    });

    return NextResponse.json({ message: "Role assignment updated" });
  } catch (error) {
    console.error("Assign Role Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
