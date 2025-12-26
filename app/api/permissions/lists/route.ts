import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import { jsonError, uiContextForbidden } from "@/lib/api-errors";

export async function GET(req: NextRequest) {
  try {
    const uiHeader = req.headers.get("x-ui-request");
    const referer = req.headers.get("referer");
    const requestOrigin = new URL(req.url).origin;
    const refererOrigin = referer ? new URL(referer).origin : null;

    if (uiHeader?.toLowerCase() !== "true" && refererOrigin !== requestOrigin) {
      return uiContextForbidden(req);
    }

    /* --------------------------------------------------------------------------
     * 1. AUTHORIZATION — REQUIRE permissions.read
     * -------------------------------------------------------------------------- */
    const auth = await authorize(req, "permissions", "read");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* --------------------------------------------------------------------------
     * 2. FETCH PERMISSION MODULES
     * -------------------------------------------------------------------------- */
    const modules = await prisma.permissionModule.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ modules });
  } catch (error: unknown) {
    return jsonError(req, {
      status: 500,
      code: "PERMISSIONS_LIST_FAILED",
      message: "Failed to load permission modules.",
      error,
    });
  }
}
