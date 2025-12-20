import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    /* --------------------------------------------------------------------------
     * 1. AUTHORIZATION — REQUIRE users.update
     * -------------------------------------------------------------------------- */
    const auth = await authorize(req, "users", "update");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    /* --------------------------------------------------------------------------
     * 2. EXTRACT USER SLUG
     * -------------------------------------------------------------------------- */
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Invalid user identifier (missing slug)." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 3. PARSE REQUEST BODY
     * -------------------------------------------------------------------------- */
    const { isActive } = await req.json();

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "The field 'isActive' must be true or false." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 4. UPDATE USER STATUS
     * -------------------------------------------------------------------------- */
    const updatedUser = await prisma.user.update({
      where: { slug },
      data: { isActive },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: `User account ${
        isActive ? "enabled" : "disabled"
      } successfully.`,
      user: updatedUser,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred while updating user status.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
