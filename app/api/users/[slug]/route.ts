import { prisma } from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorized";
import { signPayload } from "@/lib/signedUrl";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
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
    // 3. Build signed profile picture URL if possible
    // --------------------------------------------------------------------------
    let profilePicture = user.profilePicture;
    if (profilePicture) {
      try {
        let media = await prisma.media.findFirst({
          where: { url: profilePicture },
          select: {
            slug: true,
            filename: true,
            storedFilename: true,
            mimetype: true,
            path: true,
            bucket: { select: { name: true, slug: true, isAvailable: true } },
          },
        });

        if (!media) {
          try {
            const parsed = new URL(profilePicture);
            const segments = parsed.pathname.split("/").filter(Boolean);
            const storageIndex = segments[0] === "storage" ? 1 : 0;
            const bucketName = segments[storageIndex];
            const storedFilename = segments[segments.length - 1];
            const pathSegments = segments.slice(
              storageIndex + 1,
              segments.length - 1
            );
            const path = pathSegments.length ? pathSegments.join("/") : null;

            if (bucketName && storedFilename) {
              media = await prisma.media.findFirst({
                where: {
                  storedFilename,
                  bucket: { name: bucketName },
                  OR: [{ path }, { path: null }, { path: "" }],
                },
                select: {
                  slug: true,
                  filename: true,
                  storedFilename: true,
                  mimetype: true,
                  path: true,
                  bucket: {
                    select: { name: true, slug: true, isAvailable: true },
                  },
                },
              });
            }
          } catch {
            /* ignore parse failures */
          }
        }

        if (media && media.bucket && media.bucket.isAvailable !== "REMOVE") {
          const exp = Math.floor(Date.now() / 1000) + 900;
          const token = signPayload({
            action: "download",
            bucket: media.bucket.name,
            mediaSlug: media.slug,
            storedFilename: media.storedFilename,
            filename: media.filename,
            mimetype: media.mimetype,
            path: media.path ?? null,
            exp,
          });
          profilePicture = `/api/buckets/${media.bucket.slug}/download?token=${token}&inline=true`;
        }
      } catch {
        // fall back to stored URL on any error
      }
    }

    // --------------------------------------------------------------------------
    // 4. SUCCESS RESPONSE
    // --------------------------------------------------------------------------
    return NextResponse.json(
      {
        ok: true,
        message: "User detail retrieved successfully.",
        data: { ...user, profilePicture },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("❌ USER DETAIL ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch user details.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
