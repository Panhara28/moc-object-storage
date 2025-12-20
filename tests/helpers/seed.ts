import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";

const TEST_PASSWORD = "test-password";

export async function seedAuthRole() {
  await prisma.permissionModule.createMany({
    data: [
      {
        name: "users",
        label: "Users",
        description: "Test users module",
      },
    ],
    skipDuplicates: true,
  });
  const permissionModule = await prisma.permissionModule.findUnique({
    where: { name: "users" },
  });
  if (!permissionModule) {
    throw new Error("Missing permission module 'users' after seed.");
  }

  const role = await prisma.role.create({
    data: {
      name: `TestRole-${randomUUID()}`,
      description: "Test role",
    },
  });

  await prisma.rolePermission.create({
    data: {
      roleId: role.id,
      moduleId: permissionModule.id,
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Test Admin",
      email: `admin-${randomUUID()}@test.local`,
      password: TEST_PASSWORD,
      profilePicture: "",
      roleId: role.id,
      fullNameEn: "Test Admin",
    },
  });

  const token = signToken({ id: admin.id, roleId: role.id });

  return { admin, role, token, permissionModule };
}

export async function seedRoleWithPermission(moduleName: string) {
  await prisma.permissionModule.createMany({
    data: [
      {
        name: moduleName,
        label: moduleName,
        description: `Test ${moduleName} module`,
      },
    ],
    skipDuplicates: true,
  });

  const permissionModule = await prisma.permissionModule.findUnique({
    where: { name: moduleName },
  });

  if (!permissionModule) {
    throw new Error(`Missing permission module '${moduleName}' after seed.`);
  }

  const role = await prisma.role.create({
    data: {
      name: `TestRole-${randomUUID()}`,
      description: `Test role for ${moduleName}`,
    },
  });

  await prisma.rolePermission.create({
    data: {
      roleId: role.id,
      moduleId: permissionModule.id,
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Test Admin",
      email: `admin-${randomUUID()}@test.local`,
      password: TEST_PASSWORD,
      profilePicture: "",
      roleId: role.id,
      fullNameEn: "Test Admin",
    },
  });

  const token = signToken({ id: admin.id, roleId: role.id });

  return { admin, role, token, permissionModule };
}

export async function createUser({
  roleId = null,
  fullNameEn = "Test User",
}: {
  roleId?: number | null;
  fullNameEn?: string;
} = {}) {
  return prisma.user.create({
    data: {
      name: `User-${randomUUID()}`,
      email: `user-${randomUUID()}@test.local`,
      password: TEST_PASSWORD,
      profilePicture: "",
      roleId,
      fullNameEn,
    },
  });
}
