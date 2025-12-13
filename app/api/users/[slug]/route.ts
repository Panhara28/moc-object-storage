import { prisma } from "@/lib/connection";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";

export async function GET(
  req: Request,
  context: { params: { slug: string } } // ❌ remove Promise
) {
  try {
    const { slug } = await context.params;
    // --------------------------------------------------------------------------
    // 1. AUTHORIZATION CHECK
    // --------------------------------------------------------------------------
    const auth = await authorize(req, "users", "read");

    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, message: auth.message },
        { status: auth.status }
      );
    }

    // --------------------------------------------------------------------------
    // 2. FETCH USER BY SLUG
    // --------------------------------------------------------------------------
    const user = await prisma.user.findUnique({
      where: { slug },
      select: {
        slug: true,
        profilePicture: true,
        name: true,

        fullNameKh: true,
        fullNameEn: true,
        gender: true,
        generalDepartment: true,
        department: true,
        office: true,
        phoneNumber: true,
        currentRole: true,

        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User not found." },
        { status: 404 }
      );
    }

    // --------------------------------------------------------------------------
    // 3. SUCCESS RESPONSE
    // --------------------------------------------------------------------------
    return NextResponse.json(
      {
        ok: true,
        message: "User detail retrieved successfully.",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ USER DETAIL ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch user details.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
