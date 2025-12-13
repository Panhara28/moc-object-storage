import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const auth = await authorize(req, "roles", "read");
    if (!auth.ok)
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );

    const role = await prisma.role.findUnique({
      where: { slug },
    });

    if (!role)
      return NextResponse.json({ error: "Role not found" }, { status: 404 });

    return NextResponse.json({
      status: "ok",
      data: {
        id: role.id,
        slug: role.slug,
        name: role.name,
        description: role.description,
        createdAt: role.createdAt,
      },
    });
  } catch (err: unknown) {
    console.error("❌ GET ROLE ERROR:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch role",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
