import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { resetDb, disconnectDb } from "@/tests/helpers/db";
import { seedRoleWithPermission } from "@/tests/helpers/seed";
import { jsonRequest, withAuth, withUi, expectJson } from "@/tests/helpers/api-test-utils";
import { buildMultipartBody, createBucket } from "@/tests/helpers/api-fixtures";
import { POST as login } from "@/app/api/auth/login/route";
import { POST as logout } from "@/app/api/auth/logout/route";
import { GET as getAuthMe } from "@/app/api/auth/me/route";
import { GET as getBucketDetail } from "@/app/api/buckets/[slug]/route";
import { GET as listBuckets } from "@/app/api/buckets/lists/route";
import { POST as addBucket } from "@/app/api/buckets/add/route";
import { GET as listMedia } from "@/app/api/media/lists/route";
import { GET as mediaProperties } from "@/app/api/media/properties/route";
import { GET as listRoles } from "@/app/api/roles/lists/route";
import { GET as getRole } from "@/app/api/roles/[slug]/route";
import { POST as addRole } from "@/app/api/roles/add/route";
import { GET as listPermissionModules } from "@/app/api/permissions/lists/route";
import { POST as addPermissionModule } from "@/app/api/permissions/add/route";
import { GET as listFolders } from "@/app/api/spaces/folders/lists/route";
import { POST as addFolder } from "@/app/api/spaces/folders/add/route";
import { GET as folderProperties } from "@/app/api/spaces/folders/properties/route";
import { GET as listUsers } from "@/app/api/users/lists/route";
import { GET as getUser } from "@/app/api/users/[slug]/route";
import { POST as addUser } from "@/app/api/users/add/route";
import { GET as getDocsJson } from "@/app/api/docs/json/route";
import { POST as multiUpload } from "@/app/api/multiple-upload/upload/route";

function authHeaders(token: string, ui = false) {
  const headers = withAuth(token);
  return ui ? withUi(headers) : headers;
}

describe("API baseline checks", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterAll(async () => {
    await resetDb();
    await disconnectDb();
  });

  describe("/api/auth", () => {
    it("POST /login returns 401 for invalid credentials", async () => {
      const req = jsonRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: { email: "missing@test.local", password: "bad" },
      });

      const res = await login(req);
      const body = await expectJson(res, 401);
      expect(body).toMatchObject({ error: "Invalid credentials" });
    });

    it("POST /login returns 403 for disabled user", async () => {
      const { role } = await seedRoleWithPermission("users");
      const password = "disabled-password";
      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          name: "Disabled User",
          email: "disabled@test.local",
          password: hashed,
          profilePicture: "",
          roleId: role.id,
          fullNameEn: "Disabled User",
          isActive: false,
        },
      });

      const req = jsonRequest("http://localhost/api/auth/login", {
        method: "POST",
        body: { email: "disabled@test.local", password },
      });

      const res = await login(req);
      const body = await expectJson(res, 403);
      expect(body).toMatchObject({ error: "User disabled" });
    });

    it("GET /me requires auth", async () => {
      const req = new NextRequest("http://localhost/api/auth/me");
      const res = await getAuthMe(req);
      await expectJson(res, 401);
    });

    it("POST /logout clears the session cookie", async () => {
      const res = await logout();
      expect(res.status).toBe(200);
      const cookie = res.headers.get("set-cookie") || "";
      expect(cookie).toContain("session=");
      expect(cookie).toContain("Max-Age=0");
    });
  });

  describe("/api/buckets", () => {
    it("GET /lists rejects missing UI header", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/buckets/lists", {
        headers: authHeaders(token),
      });
      const res = await listBuckets(req);
      await expectJson(res, 403);
    });

    it("GET /lists rejects missing auth", async () => {
      const req = new NextRequest("http://localhost/api/buckets/lists", {
        headers: withUi(),
      });
      const res = await listBuckets(req);
      await expectJson(res, 401);
    });

    it("POST /add validates bucket name", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/buckets/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });

      const res = await addBucket(req);
      await expectJson(res, 400);
    });

    it("POST /add returns 409 for duplicate name", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const req = jsonRequest("http://localhost/api/buckets/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: bucket.name },
      });

      const res = await addBucket(req);
      await expectJson(res, 409);
    });

    it("GET /[slug] returns 404 for missing bucket", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/buckets/missing", {
        headers: authHeaders(token),
      });

      const res = await getBucketDetail(req, {
        params: Promise.resolve({ slug: "missing" }),
      });

      await expectJson(res, 404);
    });
  });

  describe("/api/media", () => {
    it("GET /lists rejects missing UI header", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/media/lists", {
        headers: authHeaders(token),
      });
      const res = await listMedia(req);
      await expectJson(res, 403);
    });

    it("GET /properties validates slug/id", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/media/properties", {
        headers: authHeaders(token),
      });
      const res = await mediaProperties(req);
      await expectJson(res, 400);
    });

    it("GET /properties returns 404 for missing media", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest(
        "http://localhost/api/media/properties?slug=missing",
        { headers: authHeaders(token) }
      );
      const res = await mediaProperties(req);
      await expectJson(res, 404);
    });
  });

  describe("/api/roles and /api/permissions", () => {
    it("GET /roles/lists rejects missing UI header", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = new NextRequest("http://localhost/api/roles/lists", {
        headers: authHeaders(token),
      });
      const res = await listRoles(req);
      await expectJson(res, 403);
    });

    it("POST /roles/add validates name", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = jsonRequest("http://localhost/api/roles/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await addRole(req);
      await expectJson(res, 400);
    });

    it("POST /permissions/add validates required fields", async () => {
      const { token } = await seedRoleWithPermission("permissions");
      const req = jsonRequest("http://localhost/api/permissions/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await addPermissionModule(req);
      await expectJson(res, 400);
    });

    it("GET /permissions/lists rejects missing UI header", async () => {
      const { token } = await seedRoleWithPermission("permissions");
      const req = new NextRequest("http://localhost/api/permissions/lists", {
        headers: authHeaders(token),
      });
      const res = await listPermissionModules(req);
      await expectJson(res, 403);
    });

    it("GET /roles/[slug] returns 404 for missing role", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = new NextRequest("http://localhost/api/roles/missing", {
        headers: authHeaders(token),
      });
      const res = await getRole(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });
  });

  describe("/api/spaces", () => {
    it("GET /folders/lists rejects missing UI header", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/spaces/folders/lists", {
        headers: authHeaders(token),
      });
      const res = await listFolders(req);
      await expectJson(res, 403);
    });

    it("POST /folders/add validates name", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const req = jsonRequest("http://localhost/api/spaces/folders/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "", bucketId: bucket.id },
      });
      const res = await addFolder(req);
      await expectJson(res, 400);
    });

    it("GET /folders/properties validates slug", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest(
        "http://localhost/api/spaces/folders/properties",
        { headers: authHeaders(token) }
      );
      const res = await folderProperties(req);
      await expectJson(res, 400);
    });
  });

  describe("/api/users", () => {
    it("GET /lists rejects missing UI header", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = new NextRequest("http://localhost/api/users/lists", {
        headers: authHeaders(token),
      });
      const res = await listUsers(req);
      await expectJson(res, 403);
    });

    it("POST /add validates required fields", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = jsonRequest("http://localhost/api/users/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "", email: "", password: "" },
      });
      const res = await addUser(req);
      await expectJson(res, 400);
    });

    it("POST /add rejects duplicate email", async () => {
      const { token } = await seedRoleWithPermission("users");
      const email = "duplicate@test.local";
      await prisma.user.create({
        data: {
          name: "Existing User",
          email,
          password: "hashed",
          profilePicture: "",
          fullNameEn: "Existing User",
        },
      });

      const req = jsonRequest("http://localhost/api/users/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "Another", email, password: "password" },
      });
      const res = await addUser(req);
      await expectJson(res, 409);
    });

    it("GET /[slug] rejects missing UI header", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = new NextRequest("http://localhost/api/users/missing", {
        headers: authHeaders(token),
      });
      const res = await getUser(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 403);
    });
  });

  describe("/api/docs and /api/multiple-upload", () => {
    it("GET /docs/json requires auth", async () => {
      const req = new NextRequest("http://localhost/api/docs/json");
      const res = await getDocsJson(req);
      await expectJson(res, 401);
    });

    it("POST /multiple-upload/upload requires auth", async () => {
      const { body, boundary } = buildMultipartBody();
      const req = new NextRequest("http://localhost/api/multiple-upload/upload", {
        method: "POST",
        headers: {
          "content-type": `multipart/form-data; boundary=${boundary}`,
        },
        body,
      });

      const res = await multiUpload(req);
      await expectJson(res, 401);
    });

    it("POST /multiple-upload/upload validates files", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const { body, boundary } = buildMultipartBody();
      const req = new NextRequest("http://localhost/api/multiple-upload/upload", {
        method: "POST",
        headers: {
          ...authHeaders(token),
          "content-type": `multipart/form-data; boundary=${boundary}`,
        },
        body,
      });

      const res = await multiUpload(req);
      await expectJson(res, 400);
    });
  });
});
