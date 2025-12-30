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
      slug: user.slug,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture || null,
      role: user.role ? user.role.name : null, // ⭐ Safe
      permissions,
    },
  });
}
