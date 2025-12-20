import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import { Prisma } from "@/app/generated/prisma/client";

export async function GET(req: NextRequest) {
  try {
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

    const auth = await authorize(req, "users", "read");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const search = searchParams.get("search") || "";
    const roleId = searchParams.get("role");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      id: user.id,
    };

    const orFilters = [];
    if (search) {
      orFilters.push({ name: { contains: search } });
      orFilters.push({ email: { contains: search } });
    }
    if (orFilters.length > 0) where.OR = orFilters;

    if (roleId) where.roleId = Number(roleId);

    if (status === "true") where.isActive = true;
    if (status === "false") where.isActive = false;

    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "desc" },
      include: {
        role: { select: { id: true, name: true } },
      },
    });

    const total = await prisma.user.count({ where });

    return NextResponse.json({
      status: "ok",
      page,
      limit,
      total,
      data: users.map((u) => ({
        id: u.id,
        slug: u.slug,
        name: u.name,
        email: u.email,
        fullNameKh: u.fullNameKh,
        fullNameEn: u.fullNameEn,
        gender: u.gender,
        generalDepartment: u.generalDepartment,
        department: u.department,
        office: u.office,
        phoneNumber: u.phoneNumber,
        currentRole: u.currentRole,
        role: u.role?.name ?? null,
        roleId: u.role?.id ?? null,
        isActive: u.isActive,
        createdAt: u.createdAt,
      })),
    });
  } catch (error: unknown) {
    console.error("❌ Failed to fetch users:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}
