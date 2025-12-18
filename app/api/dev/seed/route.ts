import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/connection";
import { getAuthUser } from "@/lib/auth";
import crypto from "crypto";

// ------------------------------
// Key Generators
// ------------------------------
function generateAccessKeyId() {
  return "AKIA-" + crypto.randomBytes(8).toString("hex").toUpperCase();
}

function generateSecretAccessKey() {
  return crypto.randomBytes(32).toString("base64");
}

export async function POST(req: Request) {
  try {
    // Protect the destructive seed endpoint
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Seeding is disabled in production." },
        { status: 403 }
      );
    }

    const seedSecret = process.env.SEED_SECRET;
    const providedSecret = req.headers.get("x-seed-secret");

    if (!seedSecret) {
      return NextResponse.json(
        { error: "Seed secret is not configured." },
        { status: 500 }
      );
    }

    if (providedSecret !== seedSecret) {
      return NextResponse.json(
        { error: "Unauthorized seed request." },
        { status: 401 }
      );
    }

    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      const user = await getAuthUser(req);
      if (!user) {
        return NextResponse.json(
          { error: "Unauthorized seed request." },
          { status: 401 }
        );
      }
    }

    console.log("RESETTING + SEEDING FULL SYSTEM...");

    /* ========================================================================
       DELETE ORDER (MUST FOLLOW RELATION DEPENDENCIES)
    ======================================================================== */

    await prisma.mediaUploadDetail.deleteMany({});
    await prisma.mediaUpload.deleteMany({});
    await prisma.space.deleteMany({});
    await prisma.media.deleteMany({});
    await prisma.bucket.deleteMany({});
    await prisma.rolePermission.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.permissionModule.deleteMany({});

    /* ========================================================================
       PERMISSION MODULES
    ======================================================================== */

    const modules = [
      { name: "users", label: "Users" },
      { name: "roles", label: "Roles" },
      { name: "permissions", label: "Permissions" },
      { name: "media-library", label: "Media Library" },
      { name: "audiences", label: "Audiences" },
    ];

    const seededModules = [];

    for (const m of modules) {
      seededModules.push(
        await prisma.permissionModule.create({
          data: {
            name: m.name,
            label: m.label,
            description: `${m.label} module`,
          },
        })
      );
    }

    /* ========================================================================
       ROLES
    ======================================================================== */

    const adminRole = await prisma.role.create({
      data: { name: "Admin", description: "Full system access" },
    });

    const editorRole = await prisma.role.create({
      data: { name: "Editor", description: "Can manage selected resources" },
    });

    const viewerRole = await prisma.role.create({
      data: { name: "Viewer", description: "Read-only access" },
    });

    /* ========================================================================
       ROLE PERMISSIONS
    ======================================================================== */

    // Admin -> Full Access
    for (const mod of seededModules) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          moduleId: mod.id,
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      });
    }

    // Editor -> Limited modules
    const editorAllowed = ["users", "media-library", "audiences"];

    for (const mod of seededModules) {
      await prisma.rolePermission.create({
        data: {
          roleId: editorRole.id,
          moduleId: mod.id,
          create: editorAllowed.includes(mod.name),
          read: editorAllowed.includes(mod.name),
          update: editorAllowed.includes(mod.name),
          delete: false,
        },
      });
    }

    // Viewer -> Read-only
    for (const mod of seededModules) {
      await prisma.rolePermission.create({
        data: {
          roleId: viewerRole.id,
          moduleId: mod.id,
          create: false,
          read: true,
          update: false,
          delete: false,
        },
      });
    }

    /* ========================================================================
       SUPER ADMIN
    ======================================================================== */

    const hashedPassword = await bcrypt.hash("password123", 10);

    const superAdmin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        profilePicture: "",
        roleId: adminRole.id,
      },
    });

    /* ========================================================================
       DEFAULT SECURE BUCKET
    ======================================================================== */

    const defaultBucket = await prisma.bucket.create({
      data: {
        name: "uploads",
        accessKeyName: "uploads-key",
        accessKeyId: generateAccessKeyId(),
        secretAccessKey: generateSecretAccessKey(),
        permission: "FULL_ACCESS",
        createdById: superAdmin.id,
      },
    });

    /* ========================================================================
       DEFAULT ROOT FOLDER (SPACE)
    ======================================================================== */

    const defaultFolder = await prisma.space.create({
      data: {
        name: "samples",
        bucketId: defaultBucket.id,
        userId: superAdmin.id,
        parentId: null, // root folder
      },
    });

    /* ========================================================================
       SAMPLE MEDIA INSIDE SECURE BUCKET
    ======================================================================== */

    const media1 = await prisma.media.create({
      data: {
        filename: "book1.jpg",
        storedFilename: "book1.jpg",
        url: "https://moc-drive.moc.gov.kh/uploads/samples/book1.jpg",
        fileType: "IMAGE",
        mimetype: "image/jpeg",
        extension: "jpg",
        size: 50000,
        uploadedById: superAdmin.id,
        bucketId: defaultBucket.id,
        path: "samples",
      },
    });

    /* ========================================================================
       SUCCESS RESPONSE
    ======================================================================== */

    return NextResponse.json({
      message: "Full Seed Completed",
      defaultBucket: defaultBucket.name,
      defaultBucketKeyId: defaultBucket.accessKeyId,
      defaultFolder: defaultFolder.name,
    });
  } catch (error: unknown) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        error: "Failed to run seed script",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
