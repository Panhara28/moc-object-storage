import { afterAll, beforeEach, describe, it } from "vitest";
import { NextRequest } from "next/server";
import { resetDb, disconnectDb } from "@/tests/helpers/db";
import { seedRoleWithPermission } from "@/tests/helpers/seed";
import { expectJson, jsonRequest, withAuth, withUi } from "@/tests/helpers/api-test-utils";
import { buildMultipartBody, createBucket } from "@/tests/helpers/api-fixtures";
import { PATCH as archiveBucket } from "@/app/api/buckets/[slug]/archive/route";
import { POST as cleanupBucket } from "@/app/api/buckets/[slug]/cleanup/route";
import { POST as createBucketFolder } from "@/app/api/buckets/[slug]/create-folder/route";
import { PATCH as deleteBucket } from "@/app/api/buckets/[slug]/delete/route";
import { GET as downloadBucketFile } from "@/app/api/buckets/[slug]/download/route";
import { GET as listBucketFolder } from "@/app/api/buckets/[slug]/folder/route";
import { GET as listBucketMedia } from "@/app/api/buckets/[slug]/media/route";
import { PATCH as renameBucket } from "@/app/api/buckets/[slug]/rename/route";
import { PATCH as restoreBucket } from "@/app/api/buckets/[slug]/restore/route";
import { POST as generateSignedUrl } from "@/app/api/buckets/[slug]/signed-url/route";
import { GET as bucketStats } from "@/app/api/buckets/[slug]/stats/route";
import { PATCH as updateBucketPermission } from "@/app/api/buckets/[slug]/update-permission/route";
import { POST as uploadBucketFile } from "@/app/api/buckets/[slug]/upload/route";
import { POST as uploadBucketSigned } from "@/app/api/buckets/[slug]/upload-signed/route";
import { POST as addBucket } from "@/app/api/buckets/add/route";
import { GET as listBuckets } from "@/app/api/buckets/lists/route";
import { POST as copyMedia } from "@/app/api/media/copy/route";
import { POST as deleteMedia } from "@/app/api/media/delete/route";
import { GET as listMedia } from "@/app/api/media/lists/route";
import { POST as moveMedia } from "@/app/api/media/move/route";
import { GET as mediaProperties } from "@/app/api/media/properties/route";
import { GET as getRole } from "@/app/api/roles/[slug]/route";
import { POST as addRole } from "@/app/api/roles/add/route";
import { GET as listRoles } from "@/app/api/roles/lists/route";
import { GET as listRolePermissions } from "@/app/api/roles/permissions/[slug]/route";
import { POST as cloneRolePermissions } from "@/app/api/roles/permissions/clone/[id]/permissions/route";
import { PATCH as updateRolePermissions } from "@/app/api/roles/permissions/update/[slug]/route";
import { PATCH as updateRole } from "@/app/api/roles/update/[slug]/route";
import { POST as addPermissionModule } from "@/app/api/permissions/add/route";
import { GET as listPermissionModules } from "@/app/api/permissions/lists/route";
import { GET as getFolderBySlug } from "@/app/api/spaces/folders/[slug]/route";
import { POST as addFolder } from "@/app/api/spaces/folders/add/route";
import { POST as deleteFolder } from "@/app/api/spaces/folders/delete/route";
import { GET as listFolders } from "@/app/api/spaces/folders/lists/route";
import { POST as moveFolder } from "@/app/api/spaces/folders/move/route";
import { GET as folderProperties } from "@/app/api/spaces/folders/properties/route";
import { POST as renameFolder } from "@/app/api/spaces/folders/rename/route";
import { GET as getUser } from "@/app/api/users/[slug]/route";
import { POST as addUser } from "@/app/api/users/add/route";
import { PATCH as assignUserRole } from "@/app/api/users/assign-role/[slug]/role/route";
import { GET as listUsers } from "@/app/api/users/lists/route";
import { PATCH as resetUserPassword } from "@/app/api/users/reset-password/[slug]/reset/route";
import { PATCH as updateUserStatus } from "@/app/api/users/status/[slug]/route";
import { PATCH as updateUser } from "@/app/api/users/update/[slug]/route";
import { POST as multiUpload } from "@/app/api/multiple-upload/upload/route";

function authHeaders(token: string, ui = false) {
  const headers = withAuth(token);
  return ui ? withUi(headers) : headers;
}

describe("API validation and 404 coverage", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterAll(async () => {
    await resetDb();
    await disconnectDb();
  });

  describe("Buckets", () => {
    it("GET /api/buckets/lists requires UI header", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/buckets/lists", {
        headers: authHeaders(token),
      });
      const res = await listBuckets(req);
      await expectJson(res, 403);
    });

    it("PATCH /api/buckets/[slug]/archive returns 404 for missing bucket", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest(
        "http://localhost/api/buckets/missing/archive",
        { method: "PATCH", headers: authHeaders(token) }
      );
      const res = await archiveBucket(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });

    it("POST /api/buckets/[slug]/cleanup requires confirmation", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/buckets/missing/cleanup", {
        method: "POST",
        headers: authHeaders(token),
        body: { confirm: false },
      });
      const res = await cleanupBucket(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("POST /api/buckets/[slug]/create-folder validates name", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/buckets/missing/create-folder", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await createBucketFolder(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/buckets/[slug]/delete returns 404 for missing bucket", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest(
        "http://localhost/api/buckets/missing/delete",
        { method: "PATCH", headers: authHeaders(token) }
      );
      const res = await deleteBucket(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });

    it("GET /api/buckets/[slug]/download requires token", async () => {
      const req = new NextRequest(
        "http://localhost/api/buckets/any/download"
      );
      const res = await downloadBucketFile(req, {
        params: Promise.resolve({ slug: "any" }),
      });
      await expectJson(res, 400);
    });

    it("GET /api/buckets/[slug]/folder requires parentSlug", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const req = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/folder`,
        { headers: authHeaders(token) }
      );
      const res = await listBucketFolder(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 400);
    });

    it("GET /api/buckets/[slug]/media rejects invalid date range", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const req = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/media?dateFrom=bad-date`,
        { headers: authHeaders(token) }
      );
      const res = await listBucketMedia(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/buckets/[slug]/rename validates name", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/buckets/missing/rename", {
        method: "PATCH",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await renameBucket(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/buckets/[slug]/restore returns 404 for missing bucket", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest(
        "http://localhost/api/buckets/missing/restore",
        { method: "PATCH", headers: authHeaders(token) }
      );
      const res = await restoreBucket(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });

    it("POST /api/buckets/[slug]/signed-url rejects invalid action", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest(
        "http://localhost/api/buckets/missing/signed-url",
        { method: "POST", headers: authHeaders(token), body: { action: "nope" } }
      );
      const res = await generateSignedUrl(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("GET /api/buckets/[slug]/stats returns 404 for missing bucket", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/buckets/missing/stats", {
        headers: authHeaders(token),
      });
      const res = await bucketStats(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });

    it("PATCH /api/buckets/[slug]/update-permission validates permission", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest(
        "http://localhost/api/buckets/missing/update-permission",
        { method: "PATCH", headers: authHeaders(token), body: {} }
      );
      const res = await updateBucketPermission(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("POST /api/buckets/[slug]/upload validates file presence", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const { body, boundary } = buildMultipartBody();
      const req = new NextRequest(
        "http://localhost/api/buckets/missing/upload",
        {
          method: "POST",
          headers: {
            ...authHeaders(token),
            "content-type": `multipart/form-data; boundary=${boundary}`,
          },
          body,
        }
      );
      const res = await uploadBucketFile(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("POST /api/buckets/[slug]/upload-signed requires token", async () => {
      const req = new NextRequest(
        "http://localhost/api/buckets/any/upload-signed",
        { method: "POST" }
      );
      const res = await uploadBucketSigned(req, {
        params: Promise.resolve({ slug: "any" }),
      });
      await expectJson(res, 400);
    });

    it("POST /api/buckets/add validates name", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/buckets/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await addBucket(req);
      await expectJson(res, 400);
    });
  });

  describe("Media", () => {
    it("GET /api/media/lists requires UI header", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/media/lists", {
        headers: authHeaders(token),
      });
      const res = await listMedia(req);
      await expectJson(res, 403);
    });

    it("POST /api/media/copy validates mediaSlug", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/media/copy", {
        method: "POST",
        headers: authHeaders(token),
        body: {},
      });
      const res = await copyMedia(req);
      await expectJson(res, 400);
    });

    it("POST /api/media/delete validates slug/id", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/media/delete", {
        method: "POST",
        headers: authHeaders(token),
        body: {},
      });
      const res = await deleteMedia(req);
      await expectJson(res, 400);
    });

    it("POST /api/media/move validates mediaSlug", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/media/move", {
        method: "POST",
        headers: authHeaders(token),
        body: {},
      });
      const res = await moveMedia(req);
      await expectJson(res, 400);
    });

    it("GET /api/media/properties validates slug/id", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/media/properties", {
        headers: authHeaders(token),
      });
      const res = await mediaProperties(req);
      await expectJson(res, 400);
    });
  });

  describe("Roles and permissions", () => {
    it("GET /api/roles/lists requires UI header", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = new NextRequest("http://localhost/api/roles/lists", {
        headers: authHeaders(token),
      });
      const res = await listRoles(req);
      await expectJson(res, 403);
    });

    it("GET /api/roles/[slug] returns 404 for missing role", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = new NextRequest("http://localhost/api/roles/missing", {
        headers: authHeaders(token),
      });
      const res = await getRole(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });

    it("POST /api/roles/add validates name", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = jsonRequest("http://localhost/api/roles/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await addRole(req);
      await expectJson(res, 400);
    });

    it("GET /api/roles/permissions/[slug] returns 404 for missing role", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = new NextRequest(
        "http://localhost/api/roles/permissions/missing",
        { headers: authHeaders(token) }
      );
      const res = await listRolePermissions(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });

    it("POST /api/roles/permissions/clone/[id]/permissions validates target id", async () => {
      const { token } = await seedRoleWithPermission("roles");
      const req = jsonRequest(
        "http://localhost/api/roles/permissions/clone/not-a-number/permissions",
        { method: "POST", headers: authHeaders(token), body: {} }
      );
      const res = await cloneRolePermissions(req, {
        params: Promise.resolve({ id: "not-a-number" }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/roles/permissions/update/[slug] validates permissions body", async () => {
      const { role, token } = await seedRoleWithPermission("roles");
      const req = jsonRequest(
        `http://localhost/api/roles/permissions/update/${role.slug}`,
        { method: "PATCH", headers: authHeaders(token), body: {} }
      );
      const res = await updateRolePermissions(req, {
        params: Promise.resolve({ slug: role.slug }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/roles/update/[slug] validates payload", async () => {
      const { role, token } = await seedRoleWithPermission("roles");
      const req = jsonRequest(
        `http://localhost/api/roles/update/${role.slug}`,
        { method: "PATCH", headers: authHeaders(token), body: {} }
      );
      const res = await updateRole(req, {
        params: Promise.resolve({ slug: role.slug }),
      });
      await expectJson(res, 400);
    });

    it("POST /api/permissions/add validates fields", async () => {
      const { token } = await seedRoleWithPermission("permissions");
      const req = jsonRequest("http://localhost/api/permissions/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await addPermissionModule(req);
      await expectJson(res, 400);
    });

    it("GET /api/permissions/lists requires UI header", async () => {
      const { token } = await seedRoleWithPermission("permissions");
      const req = new NextRequest("http://localhost/api/permissions/lists", {
        headers: authHeaders(token),
      });
      const res = await listPermissionModules(req);
      await expectJson(res, 403);
    });
  });

  describe("Spaces (folders)", () => {
    it("GET /api/spaces/folders/[slug] returns 404 for missing folder", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest("http://localhost/api/spaces/folders/missing", {
        headers: authHeaders(token),
      });
      const res = await getFolderBySlug(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 404);
    });

    it("POST /api/spaces/folders/add validates name", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/spaces/folders/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "" },
      });
      const res = await addFolder(req);
      await expectJson(res, 400);
    });

    it("POST /api/spaces/folders/delete validates folderId", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/spaces/folders/delete", {
        method: "POST",
        headers: authHeaders(token),
        body: {},
      });
      const res = await deleteFolder(req);
      await expectJson(res, 400);
    });

    it("GET /api/spaces/folders/lists requires UI header", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest(
        "http://localhost/api/spaces/folders/lists",
        { headers: authHeaders(token) }
      );
      const res = await listFolders(req);
      await expectJson(res, 403);
    });

    it("POST /api/spaces/folders/move validates payload", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/spaces/folders/move", {
        method: "POST",
        headers: authHeaders(token),
        body: {},
      });
      const res = await moveFolder(req);
      await expectJson(res, 400);
    });

    it("GET /api/spaces/folders/properties validates slug", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = new NextRequest(
        "http://localhost/api/spaces/folders/properties",
        { headers: authHeaders(token) }
      );
      const res = await folderProperties(req);
      await expectJson(res, 400);
    });

    it("POST /api/spaces/folders/rename validates payload", async () => {
      const { token } = await seedRoleWithPermission("media-library");
      const req = jsonRequest("http://localhost/api/spaces/folders/rename", {
        method: "POST",
        headers: authHeaders(token),
        body: { folderId: 1 },
      });
      const res = await renameFolder(req);
      await expectJson(res, 400);
    });
  });

  describe("Users", () => {
    it("GET /api/users/[slug] requires UI header", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = new NextRequest("http://localhost/api/users/missing", {
        headers: authHeaders(token),
      });
      const res = await getUser(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 403);
    });

    it("GET /api/users/lists requires UI header", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = new NextRequest("http://localhost/api/users/lists", {
        headers: authHeaders(token),
      });
      const res = await listUsers(req);
      await expectJson(res, 403);
    });

    it("POST /api/users/add validates required fields", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = jsonRequest("http://localhost/api/users/add", {
        method: "POST",
        headers: authHeaders(token),
        body: { name: "", email: "", password: "" },
      });
      const res = await addUser(req);
      await expectJson(res, 400);
    });

    it("PATCH /api/users/assign-role/[slug]/role validates roleId", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = jsonRequest("http://localhost/api/users/missing/role", {
        method: "PATCH",
        headers: authHeaders(token),
        body: {},
      });
      const res = await assignUserRole(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/users/reset-password/[slug]/reset validates password", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = jsonRequest(
        "http://localhost/api/users/missing/reset",
        { method: "PATCH", headers: authHeaders(token), body: {} }
      );
      const res = await resetUserPassword(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/users/status/[slug] validates isActive", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = jsonRequest("http://localhost/api/users/missing/status", {
        method: "PATCH",
        headers: authHeaders(token),
        body: {},
      });
      const res = await updateUserStatus(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });

    it("PATCH /api/users/update/[slug] validates empty payload", async () => {
      const { token } = await seedRoleWithPermission("users");
      const req = jsonRequest("http://localhost/api/users/missing/update", {
        method: "PATCH",
        headers: authHeaders(token),
        body: {},
      });
      const res = await updateUser(req, {
        params: Promise.resolve({ slug: "missing" }),
      });
      await expectJson(res, 400);
    });
  });

  describe("Docs and multi-upload", () => {
    it("POST /api/multiple-upload/upload validates file presence", async () => {
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
