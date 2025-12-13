import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";

/**
 * @swagger
 * /api/users/lists:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get list of users
 *     description: >
 *       Returns paginated list of users with optional filtering by search, role, and status.
 *       Requires **users.read** permission.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: role
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [true, false]
 *
 *     responses:
 *       200:
 *         description: Paginated users list
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
export async function GET(req: Request) {
  try {
    const auth = await authorize(req, "users", "read");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const search = searchParams.get("search") || "";
    const roleId = searchParams.get("role");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: any = {};

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
  } catch (error: any) {
    console.error("❌ Failed to fetch users:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch users",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
