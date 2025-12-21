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
    { name: "spaces", label: "Spaces" },
    { name: "buckets", label: "Buckets" },
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
     ROLES + PERMISSIONS
  ====================================================== */
  type PermissionFlags = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };

  type RoleSpec = {
    name: string;
    description: string;
    mode?: "full" | "read-only" | "none";
    permissions?: Record<string, Partial<PermissionFlags>>;
  };

  const roleSpecs: RoleSpec[] = [
    { name: "Admin", description: "Full system access", mode: "full" },
    {
      name: "Editor",
      description: "Can manage selected resources",
      permissions: {
        users: { create: true, read: true, update: true },
        "media-library": { create: true, read: true, update: true },
        spaces: { create: true, read: true, update: true },
        buckets: { create: true, read: true, update: true },
      },
    },
    { name: "Viewer", description: "Read-only access", mode: "read-only" },
    { name: "No Access", description: "No permissions", mode: "none" },
    {
      name: "Media Manager",
      description: "Full access to media only",
      permissions: {
        "media-library": {
          create: true,
          read: true,
          update: true,
          delete: true,
        },
        spaces: { create: true, read: true, update: true, delete: true },
      },
    },
    {
      name: "Media Uploader",
      description: "Upload-only access to media",
      permissions: {
        "media-library": { create: true, read: true },
        spaces: { create: true, read: true },
      },
    },
    {
      name: "User Manager",
      description: "Full access to users",
      permissions: {
        users: { create: true, read: true, update: true, delete: true },
      },
    },
    {
      name: "Role Manager",
      description: "Manage roles and permissions",
      permissions: {
        roles: { read: true, update: true },
        permissions: { read: true, update: true },
      },
    },
  ];

  const defaultFlags: PermissionFlags = {
    create: false,
    read: false,
    update: false,
    delete: false,
  };

  const createRoleWithPermissions = async (spec: RoleSpec) => {
    const role = await prisma.role.create({
      data: { name: spec.name, description: spec.description },
    });

    for (const mod of seededModules) {
      let flags: PermissionFlags = { ...defaultFlags };
      if (spec.mode === "full") {
        flags = { create: true, read: true, update: true, delete: true };
      } else if (spec.mode === "read-only") {
        flags = { ...defaultFlags, read: true };
      }

      const overrides = spec.permissions?.[mod.name];
      if (overrides) {
        flags = { ...flags, ...overrides };
      }

      await prisma.rolePermission.create({
        data: {
          roleId: role.id,
          moduleId: mod.id,
          ...flags,
        },
      });
    }

    return role;
  };

  const rolesByName: Record<string, { id: number }> = {};
  for (const spec of roleSpecs) {
    const role = await createRoleWithPermissions(spec);
    rolesByName[spec.name] = role;
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
      roleId: rolesByName["Admin"].id,
    },
  });

  const seedUsers = [
    { name: "Editor User", email: "editor@example.com", role: "Editor" },
    { name: "Viewer User", email: "viewer@example.com", role: "Viewer" },
    { name: "No Access User", email: "noaccess@example.com", role: "No Access" },
    { name: "Media Manager", email: "media@example.com", role: "Media Manager" },
    { name: "Media Uploader", email: "upload@example.com", role: "Media Uploader" },
    { name: "User Manager", email: "users@example.com", role: "User Manager" },
    { name: "Role Manager", email: "roles@example.com", role: "Role Manager" },
  ];

  await Promise.all(
    seedUsers.map((user) =>
      prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          profilePicture: "",
          roleId: rolesByName[user.role].id,
        },
      })
    )
  );

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
