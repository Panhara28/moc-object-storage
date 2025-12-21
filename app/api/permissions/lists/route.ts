import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";

export async function GET(req: NextRequest) {
  try {
    const uiHeader = req.headers.get("x-ui-request");
    const referer = req.headers.get("referer");
    const requestOrigin = new URL(req.url).origin;
    const refererOrigin = referer ? new URL(referer).origin : null;

    if (uiHeader?.toLowerCase() !== "true" && refererOrigin !== requestOrigin) {
      return NextResponse.json(
        { status: "error", message: "Forbidden" },
        { status: 403 }
      );
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
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while fetching permission modules.",
      },
      { status: 500 }
    );
  }
}
