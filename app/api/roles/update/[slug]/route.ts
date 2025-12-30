import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export async function PATCH(
  req: NextRequest,
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
    const auditInfo = getAuditRequestInfo(req);

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

    await logAudit({
      ...auditInfo,
      actorId: auth!.user!.id,
      action: "role.update",
      resourceType: "Role",
      resourceId: updated.id,
      status: 200,
      metadata: {
        roleSlug: slug,
        name: data.name ?? null,
        description: data.description ?? null,
      },
    });

    return NextResponse.json({
      message: "Role updated successfully.",
      role: updated,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred while updating the role.",
      },
      { status: 500 }
    );
  }
}
