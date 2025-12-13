import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";

export async function GET(req: Request) {
  try {
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
        error: "An unexpected error occurred while fetching permission modules.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
