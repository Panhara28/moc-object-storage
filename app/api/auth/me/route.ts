import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { signPayload } from "@/lib/signedUrl";

async function buildSignedAvatarUrl(profilePicture?: string | null) {
  if (!profilePicture) return null;

  try {
    // Try lookup by full URL first
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

    // Fallback: parse the URL to find bucket + stored filename
    if (!media) {
      try {
        const parsed = new URL(profilePicture);
        const segments = parsed.pathname.split("/").filter(Boolean);
        // Expected: /storage/<bucket>/<...path>/storedFilename
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
              bucket: { select: { name: true, slug: true, isAvailable: true } },
            },
          });
        }
      } catch {
        /* ignore parse failures */
      }
    }

    if (!media || !media.bucket || media.bucket.isAvailable === "REMOVE") {
      return profilePicture;
    }

    const exp = Math.floor(Date.now() / 1000) + 900; // 15 minutes
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

    return `/api/buckets/${media.bucket.slug}/download?token=${token}&inline=true`;
  } catch {
    // If signing fails (e.g., missing SIGNING_SECRET), fall back to original URL
    return profilePicture;
  }
}

export async function GET(req: Request) {
  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const permissions: Record<
    string,
    { create: boolean; read: boolean; update: boolean; delete: boolean }
  > = {};

  // ⭐ Safe optional chain
  user.role?.permissions?.forEach((p) => {
    permissions[p.module.name] = {
      create: p.create,
      read: p.read,
      update: p.update,
      delete: p.delete,
    };
  });

  const signedAvatar = await buildSignedAvatarUrl(user.profilePicture);

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      fullNameKh: user.fullNameKh,
      fullNameEn: user.fullNameEn,
      gender: user.gender,
      generalDepartment: user.generalDepartment,
      department: user.department,
      office: user.office,
      phoneNumber: user.phoneNumber,
      currentRole: user.currentRole,
      profilePicture: signedAvatar || user.profilePicture,
      role: user.role ? user.role.name : null, // ⭐ Safe
      permissions,
    },
  });
}
