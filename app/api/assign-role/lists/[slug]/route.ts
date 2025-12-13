// /api/assign-role/lists/[slug]/route.ts

import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { slug: string } } // ❌ remove Promise
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
