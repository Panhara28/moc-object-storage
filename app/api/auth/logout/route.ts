import { NextRequest, NextResponse } from "next/server";
import { verifyTokenLite } from "@/lib/auth-lite";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export async function POST(req?: NextRequest) {
  const auditInfo = getAuditRequestInfo(req);
  const token = req?.cookies.get("session")?.value;
  const decoded = token ? verifyTokenLite(token) : null;
  const actorId =
    decoded && typeof decoded === "object" && "id" in decoded
      ? Number((decoded as { id?: number | string }).id)
      : null;
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("session", "", { maxAge: 0, path: "/" });
  await logAudit({
    ...auditInfo,
    actorId,
    action: "auth.logout",
    resourceType: "User",
    resourceId: actorId,
    status: 200,
  });
  return res;
}
