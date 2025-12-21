import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    // 1. Authorization
    const auth = await authorize(req, "users", "create");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const auditInfo = getAuditRequestInfo(req);

    // 2. Parse request
    const data = await req.json();

    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, password." },
        { status: 400 }
      );
    }

    // 3. Check email existing
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 }
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 5. Create user (no return selection needed)
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        profilePicture: data.profilePicture ?? "",

        // Optional fields
        fullNameKh: data.fullNameKh ?? null,
        fullNameEn: data.fullNameEn ?? null,
        gender: data.gender ?? null,
        generalDepartment: data.generalDepartment ?? null,
        department: data.department ?? null,
        office: data.office ?? null,
        phoneNumber: data.phoneNumber ?? null,
        currentRole: data.currentRole ?? null,
      },
      select: {
        id: true,
        email: true,
        slug: true,
      },
    });

    await logAudit({
      ...auditInfo,
      actorId: auth.user.id,
      action: "user.create",
      resourceType: "User",
      resourceId: newUser.id,
      status: 200,
      metadata: {
        email: newUser.email,
        slug: newUser.slug,
      },
    });

    // ⭐ SUCCESS (simple response only)
    return NextResponse.json(
      { message: "User created successfully." },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred while creating the user.",
      },
      { status: 500 }
    );
  }
}
