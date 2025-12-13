import { authorize } from "@/lib/authorized";
import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    /* --------------------------------------------------------------------------
     * 1. AUTHORIZATION CHECK
     * -------------------------------------------------------------------------- */
    const auth = await authorize(req, "roles", "update");

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    /* --------------------------------------------------------------------------
     * 2. GET ROLE SLUG
     * -------------------------------------------------------------------------- */
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Invalid role identifier (missing slug)." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 3. PARSE BODY
     * -------------------------------------------------------------------------- */
    const data = await req.json();

    if (!data.name && !data.description) {
      return NextResponse.json(
        { error: "Nothing to update. Provide 'name' or 'description'." },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------------------------
     * 4. UPDATE ROLE
     * -------------------------------------------------------------------------- */
    const updated = await prisma.role.update({
      where: { slug },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
      },
    });

    return NextResponse.json({
      message: "Role updated successfully.",
      role: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred while updating the role.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
