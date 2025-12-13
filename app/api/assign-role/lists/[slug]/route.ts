// /api/assign-role/lists/[slug]/route.ts

import { prisma } from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const data = await prisma.role.findUnique({
    where: { slug },
    include: {
      users: {
        // <-- relation Role -> Users
        select: {
          id: true,
          fullNameEn: true,
        },
      },
    },
  });

  return NextResponse.json({ data: data?.users || [] });
}
