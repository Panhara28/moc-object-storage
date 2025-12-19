import { prisma } from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import { Prisma, Gender } from "@/lib/generated/prisma";

type UpdateUserPayload = Partial<{
  name: string;
  email: string;
  profilePicture: string | null;
  fullNameKh: string | null;
  fullNameEn: string | null;
  gender: string | null;
  generalDepartment: string | null;
  department: string | null;
  office: string | null;
  phoneNumber: string | null;
  currentRole: string | null;
}>;

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // 1) AUTHORIZATION
    const auth = await authorize(req, "users", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }

    // 2) SLUG
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json(
        { error: "Missing user slug." },
        { status: 400 }
      );
    }

    // 3) PAYLOAD
    const data: UpdateUserPayload = await req.json();
    const updateData: Prisma.UserUpdateInput = {};

    // Required string fields (when provided)
    if ("name" in data) {
      if (typeof data.name !== "string" || !data.name.trim()) {
        return NextResponse.json(
          { error: "Name must be a non-empty string." },
          { status: 400 }
        );
      }
      updateData.name = data.name.trim();
    }

    let newEmail: string | undefined;
    if ("email" in data) {
      if (typeof data.email !== "string" || !data.email.trim()) {
        return NextResponse.json(
          { error: "Email must be a non-empty string." },
          { status: 400 }
        );
      }
      newEmail = data.email.trim();
      updateData.email = newEmail;
    }

    if ("profilePicture" in data) {
      if (data.profilePicture === null) {
        updateData.profilePicture = null;
      } else if (typeof data.profilePicture === "string") {
        updateData.profilePicture = data.profilePicture;
      } else {
        return NextResponse.json(
          { error: "profilePicture must be a string or null." },
          { status: 400 }
        );
      }
    }

    if ("fullNameKh" in data) {
      updateData.fullNameKh = data.fullNameKh ?? null;
    }
    if ("fullNameEn" in data) {
      updateData.fullNameEn = data.fullNameEn ?? null;
    }
    if ("gender" in data) {
      if (data.gender === null) {
        updateData.gender = null;
      } else if (typeof data.gender === "string") {
        const normalizedGender = data.gender.toUpperCase();
        if (Object.values(Gender).includes(normalizedGender as Gender)) {
          updateData.gender = normalizedGender as Gender;
        } else {
          return NextResponse.json(
            { error: "Invalid gender value." },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Gender must be a string or null." },
          { status: 400 }
        );
      }
    }
    if ("generalDepartment" in data) {
      updateData.generalDepartment = data.generalDepartment ?? null;
    }
    if ("department" in data) {
      updateData.department = data.department ?? null;
    }
    if ("office" in data) {
      updateData.office = data.office ?? null;
    }
    if ("phoneNumber" in data) {
      updateData.phoneNumber = data.phoneNumber ?? null;
    }
    if ("currentRole" in data) {
      updateData.currentRole = data.currentRole ?? null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Nothing to update." },
        { status: 400 }
      );
    }

    // Enforce unique email on change
    if (newEmail) {
      const existingEmailUser = await prisma.user.findUnique({
        where: { email: newEmail },
        select: { slug: true },
      });

      if (existingEmailUser && existingEmailUser.slug !== slug) {
        return NextResponse.json(
          { error: "A user with this email already exists." },
          { status: 409 }
        );
      }
    }

    // 4) UPDATE USER
    const updated = await prisma.user.update({
      where: { slug },
      data: updateData,
      select: {
        id: true,
        slug: true,
        email: true,
        name: true,
        profilePicture: true,
        fullNameKh: true,
        fullNameEn: true,
        gender: true,
        generalDepartment: true,
        department: true,
        office: true,
        phoneNumber: true,
        currentRole: true,
        roleId: true,
        isActive: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "User updated successfully.",
      data: updated,
    });
  } catch (error: unknown) {
    console.error("❌ USER UPDATE ERROR:", error);
    return NextResponse.json(
      {
        error: "Unexpected server error.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
