import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    /* --------------------------------------------------------------------------
     * 1. AUTHORIZATION CHECK — USER MUST HAVE users.update
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
     * 3. PARSE BODY
     * -------------------------------------------------------------------------- */
    const { roleId } = await req.json();

    if (!roleId) {
      return NextResponse.json(
        { error: "The field 'roleId' is required." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 4. VALIDATE ROLE EXISTS
     * -------------------------------------------------------------------------- */
    const roleExists = await prisma.role.findUnique({
      where: { id: Number(roleId) },
    });

    if (!roleExists) {
      return NextResponse.json(
        { error: "The specified role does not exist." },
        { status: 404 }
      );
    }

    /* --------------------------------------------------------------------------
     * 5. UPDATE USER ROLE
     * -------------------------------------------------------------------------- */
    const updatedUser = await prisma.user.update({
      where: { slug },
      data: { roleId: Number(roleId) },
      select: {
        id: true,
        email: true,
        name: true,
        roleId: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Role assigned successfully.",
      user: updatedUser,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred while assigning the role.",
      },
      { status: 500 }
    );
  }
}
