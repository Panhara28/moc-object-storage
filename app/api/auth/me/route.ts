import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const permissions: Record<
    string,
    { create: boolean; read: boolean; update: boolean; delete: boolean }
  > = {};

  // ⭐ Safe optional chain
  user.role?.permissions?.forEach((p) => {
    permissions[p.module.name] = {
      create: p.create,
      read: p.read,
      update: p.update,
      delete: p.delete,
    };
  });

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      fullNameKh: user.fullNameKh,
      fullNameEn: user.fullNameEn,
      gender: user.gender,
      generalDepartment: user.generalDepartment,
      department: user.department,
      office: user.office,
      phoneNumber: user.phoneNumber,
      currentRole: user.currentRole,
      profilePicture: user.profilePicture,
      role: user.role ? user.role.name : null, // ⭐ Safe
      permissions,
    },
  });
}
