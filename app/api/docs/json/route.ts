import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getSwaggerSpec } from "@/swagger.config";

export async function GET(req: Request) {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(getSwaggerSpec());
}
