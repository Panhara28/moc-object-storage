import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { resetDb, disconnectDb } from "@/tests/helpers/db";
import { createUser, seedAuthRole } from "@/tests/helpers/seed";
import { GET as listRoleUsers } from "@/app/api/assign-role/lists/[slug]/route";
import { PATCH as updateRoleUsers } from "@/app/api/assign-role/update/[slug]/route";

describe("/api/assign-role", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterAll(async () => {
    await resetDb();
    await disconnectDb();
  });

  it("GET /lists returns users assigned to a role", async () => {
    const { role, token } = await seedAuthRole();
    await createUser({ roleId: role.id, fullNameEn: "User One" });
    await createUser({ roleId: role.id, fullNameEn: "User Two" });

    const req = new NextRequest(
      `http://localhost/api/assign-role/lists/${role.slug}`,
      {
        headers: {
          "x-ui-request": "true",
          cookie: `session=${token}`,
        },
      }
    );

    const res = await listRoleUsers(req, {
      params: Promise.resolve({ slug: role.slug }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    const names = body.data.map((u: { fullNameEn: string }) => u.fullNameEn);
    expect(names.sort()).toEqual(["Test Admin", "User One", "User Two"]);
  });

  it("GET /lists requires authentication", async () => {
    const { role } = await seedAuthRole();

    const req = new NextRequest(
      `http://localhost/api/assign-role/lists/${role.slug}`,
      { headers: { "x-ui-request": "true" } }
    );

    const res = await listRoleUsers(req, {
      params: Promise.resolve({ slug: role.slug }),
    });

    expect(res.status).toBe(401);
  });

  it("PATCH /update updates role assignments", async () => {
    const { role, token } = await seedAuthRole();
    const keepUser = await createUser({
      roleId: role.id,
      fullNameEn: "Keep User",
    });
    const removeUser = await createUser({
      roleId: role.id,
      fullNameEn: "Remove User",
    });
    const addUser = await createUser({
      roleId: null,
      fullNameEn: "Add User",
    });

    const req = new NextRequest(
      `http://localhost/api/assign-role/update/${role.slug}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          cookie: `session=${token}`,
        },
        body: JSON.stringify({ users: [keepUser.id, addUser.id] }),
      }
    );

    const res = await updateRoleUsers(req, {
      params: Promise.resolve({ slug: role.slug }),
    });

    expect(res.status).toBe(200);

    const refreshedKeep = await prisma.user.findUnique({
      where: { id: keepUser.id },
      select: { roleId: true },
    });
    const refreshedRemove = await prisma.user.findUnique({
      where: { id: removeUser.id },
      select: { roleId: true },
    });
    const refreshedAdd = await prisma.user.findUnique({
      where: { id: addUser.id },
      select: { roleId: true },
    });

    expect(refreshedKeep?.roleId).toBe(role.id);
    expect(refreshedRemove?.roleId).toBeNull();
    expect(refreshedAdd?.roleId).toBe(role.id);
  });

  it("PATCH /update validates request body", async () => {
    const { role, token } = await seedAuthRole();

    const req = new NextRequest(
      `http://localhost/api/assign-role/update/${role.slug}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          cookie: `session=${token}`,
        },
        body: JSON.stringify({ users: "not-an-array" }),
      }
    );

    const res = await updateRoleUsers(req, {
      params: Promise.resolve({ slug: role.slug }),
    });

    expect(res.status).toBe(400);
  });

  it("PATCH /update returns 404 for missing role", async () => {
    const { token } = await seedAuthRole();

    const req = new NextRequest(
      "http://localhost/api/assign-role/update/missing-role",
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          cookie: `session=${token}`,
        },
        body: JSON.stringify({ users: [] }),
      }
    );

    const res = await updateRoleUsers(req, {
      params: Promise.resolve({ slug: "missing-role" }),
    });

    expect(res.status).toBe(404);
  });
});
