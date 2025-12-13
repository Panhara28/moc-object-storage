// /api/assign-role/update/[slug]/route.ts

import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: { slug: string } } // ❌ remove Promise
) {
  const { slug } = await context.params;
  const { users: selectedUserIds } = await req.json();

  try {
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
    const removeIds = existingIds.filter((id) => !selectedUserIds.includes(id));

    // 4. Users to ADD (selected but not previously assigned)
    const addIds = selectedUserIds.filter(
      (id: number) => !existingIds.includes(id)
    );

    // 5. UPDATE DB (remove role)
    await prisma.user.updateMany({
      where: { id: { in: removeIds } },
      data: { roleId: null },
    });

    // 6. UPDATE DB (assign role)
    await prisma.user.updateMany({
      where: { id: { in: addIds } },
      data: { roleId: role.id },
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
