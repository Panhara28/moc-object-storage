// /api/assign-role/lists/[slug]/route.ts

import { authorize } from "@/lib/authorized";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uiContextForbidden } from "@/lib/api-errors";

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
    return uiContextForbidden(req);
  }

  const auth = await authorize(req, "roles", "read");
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }
  const user = auth.user;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await prisma.role.findFirst({
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

  if (!data) {
    return NextResponse.json({ error: "Role not found." }, { status: 404 });
  }

  return NextResponse.json({ data: data?.users || [] });
}
