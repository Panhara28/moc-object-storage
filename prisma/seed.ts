import "dotenv/config";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/* ======================================================
   Key Generators
====================================================== */
function generateAccessKeyId() {
  return "AKIA-" + crypto.randomBytes(8).toString("hex").toUpperCase();
}

function generateSecretAccessKey() {
  return crypto.randomBytes(32).toString("base64");
}

/* ======================================================
   MAIN SEED
====================================================== */
export async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("❌ Seeding is disabled in production");
  }

  console.log("🔄 RESETTING + SEEDING FULL SYSTEM...");

  /* ======================================================
     DELETE ORDER (RELATION SAFE)
  ====================================================== */
  await prisma.mediaUploadDetail.deleteMany();
  await prisma.mediaUpload.deleteMany();
  await prisma.space.deleteMany();
  await prisma.media.deleteMany();
  await prisma.bucket.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permissionModule.deleteMany();

  /* ======================================================
     PERMISSION MODULES
  ====================================================== */
  const modules = [
    { name: "users", label: "Users" },
    { name: "roles", label: "Roles" },
    { name: "permissions", label: "Permissions" },
    { name: "media-library", label: "Media Library" },
    { name: "audiences", label: "Audiences" },
  ];

  const seededModules = await Promise.all(
    modules.map((m) =>
      prisma.permissionModule.create({
        data: {
          name: m.name,
          label: m.label,
          description: `${m.label} module`,
        },
      })
    )
  );

  /* ======================================================
     ROLES
  ====================================================== */
  const adminRole = await prisma.role.create({
    data: { name: "Admin", description: "Full system access" },
  });

  const editorRole = await prisma.role.create({
    data: { name: "Editor", description: "Can manage selected resources" },
  });

  const viewerRole = await prisma.role.create({
    data: { name: "Viewer", description: "Read-only access" },
  });

  /* ======================================================
     ROLE PERMISSIONS
  ====================================================== */
  // Admin → Full access
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

  // Editor → Limited access
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

  // Viewer → Read only
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

  /* ======================================================
     SUPER ADMIN USER
  ====================================================== */
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

  /* ======================================================
     DEFAULT BUCKET
  ====================================================== */
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

  /* ======================================================
     ROOT SPACE (FOLDER)
  ====================================================== */
  const defaultFolder = await prisma.space.create({
    data: {
      name: "samples",
      bucketId: defaultBucket.id,
      userId: superAdmin.id,
      parentId: null,
    },
  });

  /* ======================================================
     SAMPLE MEDIA
  ====================================================== */
  await prisma.media.create({
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

  console.log("✅ SEED COMPLETED SUCCESSFULLY");
}

/* ======================================================
   EXECUTION
====================================================== */
main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
