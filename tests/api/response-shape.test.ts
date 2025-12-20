import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { resetDb, disconnectDb } from "@/tests/helpers/db";
import { seedRoleWithPermission } from "@/tests/helpers/seed";
import { expectJson, jsonRequest, withAuth, withUi } from "@/tests/helpers/api-test-utils";
import { createBucket, createMedia, createSpace } from "@/tests/helpers/api-fixtures";
import { POST as login } from "@/app/api/auth/login/route";
import { GET as getAuthMe } from "@/app/api/auth/me/route";
import { GET as getBucketDetail } from "@/app/api/buckets/[slug]/route";
import { GET as listBuckets } from "@/app/api/buckets/lists/route";
import { GET as bucketStats } from "@/app/api/buckets/[slug]/stats/route";
import { GET as listMedia } from "@/app/api/media/lists/route";
import { GET as listRoles } from "@/app/api/roles/lists/route";
import { GET as listPermissionModules } from "@/app/api/permissions/lists/route";
import { GET as listUsers } from "@/app/api/users/lists/route";
import { GET as getUser } from "@/app/api/users/[slug]/route";
import { GET as getDocsJson } from "@/app/api/docs/json/route";

function authHeaders(token: string, ui = false) {
  const headers = withAuth(token);
  return ui ? withUi(headers) : headers;
}

describe("API response shape checks", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterAll(async () => {
    await resetDb();
    await disconnectDb();
  });

  it("POST /api/auth/login returns message and sets cookie", async () => {
    const email = `login-${randomUUID()}@test.local`;
    const password = "login-password";
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: "Login User",
        email,
        password: hashed,
        profilePicture: "",
      },
    });

    const req = jsonRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: { email, password },
    });
    const res = await login(req);
    const body = (await expectJson(res, 200)) as { message: string };
    expect(body.message).toBeTruthy();
    const cookie = res.headers.get("set-cookie") || "";
    expect(cookie).toContain("session=");
  });

  it("GET /api/auth/me returns user and permissions", async () => {
    const { token } = await seedRoleWithPermission("users");
    const req = new NextRequest("http://localhost/api/auth/me", {
      headers: authHeaders(token),
    });
    const body = (await expectJson(await getAuthMe(req), 200)) as {
      user: { id: number; email: string; name: string; permissions: Record<string, unknown> };
    };
    expect(body.user).toBeTruthy();
    expect(typeof body.user.id).toBe("number");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.name).toBe("string");
    expect(body.user.permissions).toBeTruthy();
  });

  it("GET /api/buckets/lists returns buckets array", async () => {
    const { admin, token } = await seedRoleWithPermission("media-library");
    await createBucket(admin.id);
    const req = new NextRequest("http://localhost/api/buckets/lists", {
      headers: authHeaders(token, true),
    });
    const body = (await expectJson(await listBuckets(req), 200)) as {
      status: string;
      buckets: Array<{ id: number; name: string; slug: string; permission: string }>;
    };
    expect(body.status).toBe("ok");
    expect(Array.isArray(body.buckets)).toBe(true);
    expect(typeof body.buckets[0].id).toBe("number");
  });

  it("GET /api/buckets/[slug] returns bucket, folders, and media", async () => {
    const { admin, token } = await seedRoleWithPermission("media-library");
    const bucket = await createBucket(admin.id);
    await createSpace({
      bucketId: bucket.id,
      userId: admin.id,
      name: "Folder",
    });
    await createMedia({
      bucketId: bucket.id,
      userId: admin.id,
      storedFilename: `stored-${randomUUID()}.txt`,
      filename: `file-${randomUUID()}.txt`,
    });

    const req = new NextRequest(
      `http://localhost/api/buckets/${bucket.slug}`,
      { headers: authHeaders(token) }
    );
    const body = (await expectJson(
      await getBucketDetail(req, { params: Promise.resolve({ slug: bucket.slug }) }),
      200
    )) as {
      status: string;
      bucket: { id: number; name: string; slug: string };
      folders: Array<unknown>;
      media: { items: Array<unknown> };
    };
    expect(body.status).toBe("ok");
    expect(body.bucket.slug).toBe(bucket.slug);
    expect(Array.isArray(body.folders)).toBe(true);
    expect(Array.isArray(body.media.items)).toBe(true);
  });

  it("GET /api/buckets/[slug]/stats returns stats payload", async () => {
    const { admin, token } = await seedRoleWithPermission("media-library");
    const bucket = await createBucket(admin.id);
    const req = new NextRequest(
      `http://localhost/api/buckets/${bucket.slug}/stats`,
      { headers: authHeaders(token) }
    );
    const body = (await expectJson(
      await bucketStats(req, { params: Promise.resolve({ slug: bucket.slug }) }),
      200
    )) as { status: string; mediaCount: number; totalBytes: number };
    expect(body.status).toBe("ok");
    expect(typeof body.mediaCount).toBe("number");
    expect(typeof body.totalBytes).toBe("number");
  });

  it("GET /api/media/lists returns paging structure", async () => {
    const { admin, token } = await seedRoleWithPermission("media-library");
    const bucket = await createBucket(admin.id);
    await createMedia({
      bucketId: bucket.id,
      userId: admin.id,
      storedFilename: `stored-${randomUUID()}.txt`,
      filename: `file-${randomUUID()}.txt`,
    });
    const req = new NextRequest("http://localhost/api/media/lists", {
      headers: authHeaders(token, true),
    });
    const body = (await expectJson(await listMedia(req), 200)) as {
      status: string;
      page: number;
      limit: number;
      total: number;
      data: Array<unknown>;
    };
    expect(body.status).toBe("ok");
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("GET /api/roles/lists returns roles with permissions", async () => {
    const { token } = await seedRoleWithPermission("roles");
    const req = new NextRequest("http://localhost/api/roles/lists", {
      headers: authHeaders(token, true),
    });
    const body = (await expectJson(await listRoles(req), 200)) as {
      status: string;
      data: Array<{ permissions: Array<unknown> }>;
    };
    expect(body.status).toBe("ok");
    expect(Array.isArray(body.data)).toBe(true);
    expect(Array.isArray(body.data[0]?.permissions ?? [])).toBe(true);
  });

  it("GET /api/permissions/lists returns modules array", async () => {
    const { token } = await seedRoleWithPermission("permissions");
    const req = new NextRequest("http://localhost/api/permissions/lists", {
      headers: authHeaders(token, true),
    });
    const body = (await expectJson(await listPermissionModules(req), 200)) as {
      modules: Array<unknown>;
    };
    expect(Array.isArray(body.modules)).toBe(true);
  });

  it("GET /api/users/lists returns users array", async () => {
    const { token } = await seedRoleWithPermission("users");
    const req = new NextRequest("http://localhost/api/users/lists", {
      headers: authHeaders(token, true),
    });
    const body = (await expectJson(await listUsers(req), 200)) as {
      status: string;
      data: Array<{ id: number; email: string }>;
    };
    expect(body.status).toBe("ok");
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("GET /api/users/[slug] returns user detail payload", async () => {
    const { token } = await seedRoleWithPermission("users");
    const user = await prisma.user.create({
      data: {
        name: "Detail User",
        email: `detail-${randomUUID()}@test.local`,
        password: "password",
        profilePicture: "",
      },
    });
    const req = new NextRequest(
      `http://localhost/api/users/${user.slug}`,
      { headers: authHeaders(token, true) }
    );
    const body = (await expectJson(
      await getUser(req, { params: Promise.resolve({ slug: user.slug }) }),
      200
    )) as { ok: boolean; data: { slug: string; name: string } };
    expect(body.ok).toBe(true);
    expect(body.data.slug).toBe(user.slug);
  });

  it("GET /api/docs/json returns OpenAPI spec", async () => {
    const { token } = await seedRoleWithPermission("users");
    const req = new NextRequest("http://localhost/api/docs/json", {
      headers: authHeaders(token),
    });
    const body = (await expectJson(await getDocsJson(req), 200)) as {
      openapi?: string;
      paths?: Record<string, unknown>;
    };
    expect(body.openapi || body.paths).toBeTruthy();
  });
});
