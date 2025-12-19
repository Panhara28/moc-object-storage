// /api/assign-role/lists/[slug]/route.ts

import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

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

  const auth = await authorize(req, "users", "update");
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

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
