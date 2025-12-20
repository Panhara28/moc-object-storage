import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
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
     * 2. PARAMS — EXTRACT USER SLUG
     * -------------------------------------------------------------------------- */
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Invalid user identifier (missing slug)." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 3. VALIDATE REQUEST BODY
     * -------------------------------------------------------------------------- */
    const { newPassword } = await req.json();

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { error: "The field 'newPassword' is required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 4. HASH NEW PASSWORD
     * -------------------------------------------------------------------------- */
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    /* --------------------------------------------------------------------------
     * 5. UPDATE USER PASSWORD
     * -------------------------------------------------------------------------- */
    const updatedUser = await prisma.user.update({
      where: { slug },
      data: { password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true,
        roleId: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Password reset successfully.",
      user: updatedUser,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred while resetting the password.",
      },
      { status: 500 }
    );
  }
}
