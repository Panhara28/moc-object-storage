import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";

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
    await prisma.user.create({
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
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
