import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import { resetDb, disconnectDb } from "@/tests/helpers/db";
import { seedAuthRole, seedRoleWithPermission, createUser } from "@/tests/helpers/seed";
import {
  expectJson,
  expectNoDbChanges,
  jsonRequest,
  snapshotDbCounts,
  withAuth,
  withUi,
} from "@/tests/helpers/api-test-utils";
import {
  createBucket,
  createMedia,
  createSpace,
  ensureStorageRoot,
  writeBucketFile,
} from "@/tests/helpers/api-fixtures";
import { signPayload } from "@/lib/signedUrl";
import { GET as listRoleUsers } from "@/app/api/assign-role/lists/[slug]/route";
import { PATCH as updateRoleUsers } from "@/app/api/assign-role/update/[slug]/route";
import { GET as getAuthMe } from "@/app/api/auth/me/route";
import { GET as getBucketDetail } from "@/app/api/buckets/[slug]/route";
import { PATCH as archiveBucket } from "@/app/api/buckets/[slug]/archive/route";
import { POST as cleanupBucket } from "@/app/api/buckets/[slug]/cleanup/route";
import { PATCH as deleteBucket } from "@/app/api/buckets/[slug]/delete/route";
import { GET as downloadBucketFile } from "@/app/api/buckets/[slug]/download/route";
import { GET as listBucketFolder } from "@/app/api/buckets/[slug]/folder/route";
import { GET as listBucketMedia } from "@/app/api/buckets/[slug]/media/route";
import { PATCH as regenerateBucketKey } from "@/app/api/buckets/[slug]/regenerate-access-key/route";
import { PATCH as renameBucket } from "@/app/api/buckets/[slug]/rename/route";
import { PATCH as restoreBucket } from "@/app/api/buckets/[slug]/restore/route";
import { GET as bucketStats } from "@/app/api/buckets/[slug]/stats/route";
import { PATCH as updateBucketPermission } from "@/app/api/buckets/[slug]/update-permission/route";
import { GET as listBuckets } from "@/app/api/buckets/lists/route";
import { POST as deleteMedia } from "@/app/api/media/delete/route";
import { GET as listMedia } from "@/app/api/media/lists/route";
import { GET as mediaProperties } from "@/app/api/media/properties/route";
import { GET as getRole } from "@/app/api/roles/[slug]/route";
import { GET as listRoles } from "@/app/api/roles/lists/route";
import { GET as listRolePermissions } from "@/app/api/roles/permissions/[slug]/route";
import { PATCH as updateRolePermissions } from "@/app/api/roles/permissions/update/[slug]/route";
import { PATCH as updateRole } from "@/app/api/roles/update/[slug]/route";
import { GET as listPermissionModules } from "@/app/api/permissions/lists/route";
import { GET as getFolderBySlug } from "@/app/api/spaces/folders/[slug]/route";
import { GET as listFolders } from "@/app/api/spaces/folders/lists/route";
import { POST as deleteFolder } from "@/app/api/spaces/folders/delete/route";
import { POST as moveFolder } from "@/app/api/spaces/folders/move/route";
import { GET as folderProperties } from "@/app/api/spaces/folders/properties/route";
import { POST as renameFolder } from "@/app/api/spaces/folders/rename/route";
import { GET as getUser } from "@/app/api/users/[slug]/route";
import { PATCH as assignUserRole } from "@/app/api/users/assign-role/[slug]/role/route";
import { GET as listUsers } from "@/app/api/users/lists/route";
import { PATCH as resetUserPassword } from "@/app/api/users/reset-password/[slug]/reset/route";
import { PATCH as updateUserStatus } from "@/app/api/users/status/[slug]/route";
import { PATCH as updateUser } from "@/app/api/users/update/[slug]/route";
import { GET as getDocsJson } from "@/app/api/docs/json/route";

function authHeaders(token: string, ui = false) {
  const headers = withAuth(token);
  return ui ? withUi(headers) : headers;
}

type ReadOnlyResult = {
  res: Response;
  before: Awaited<ReturnType<typeof snapshotDbCounts>>;
};

async function runReadOnly(exec: () => Promise<Response>): Promise<ReadOnlyResult> {
  const before = await snapshotDbCounts();
  const res = await exec();
  return { res, before };
}

type ReadOnlyCase = {
  name: string;
  run: () => Promise<ReadOnlyResult>;
  status?: number;
};

describe("API idempotency and read-only behavior", () => {
  beforeEach(async () => {
    await resetDb();
    await ensureStorageRoot();
  });

  afterAll(async () => {
    await resetDb();
    await disconnectDb();
  });

  describe("GET endpoints do not mutate DB state", () => {
    const cases: ReadOnlyCase[] = [
      {
        name: "GET /api/assign-role/lists/[slug]",
        run: async () => {
          const { role, token } = await seedAuthRole();
          const req = new NextRequest(
            `http://localhost/api/assign-role/lists/${role.slug}`,
            { headers: authHeaders(token, true) }
          );
          return runReadOnly(() =>
            listRoleUsers(req, {
              params: Promise.resolve({ slug: role.slug }),
            })
          );
        },
      },
      {
        name: "GET /api/auth/me",
        run: async () => {
          const { token } = await seedRoleWithPermission("users");
          const req = new NextRequest("http://localhost/api/auth/me", {
            headers: authHeaders(token),
          });
          return runReadOnly(() => getAuthMe(req));
        },
      },
      {
        name: "GET /api/buckets/lists",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          await createBucket(admin.id);
          const req = new NextRequest("http://localhost/api/buckets/lists", {
            headers: authHeaders(token, true),
          });
          return runReadOnly(() => listBuckets(req));
        },
      },
      {
        name: "GET /api/buckets/[slug]",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          await createSpace({
            bucketId: bucket.id,
            userId: admin.id,
            name: "Parent",
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
          return runReadOnly(() =>
            getBucketDetail(req, {
              params: Promise.resolve({ slug: bucket.slug }),
            })
          );
        },
      },
      {
        name: "GET /api/buckets/[slug]/folder",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          const parent = await createSpace({
            bucketId: bucket.id,
            userId: admin.id,
            name: "Parent",
          });
          await createSpace({
            bucketId: bucket.id,
            userId: admin.id,
            parentId: parent.id,
            name: "Child",
          });
          const req = new NextRequest(
            `http://localhost/api/buckets/${bucket.slug}/folder?parentSlug=${parent.slug}`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() =>
            listBucketFolder(req, {
              params: Promise.resolve({ slug: bucket.slug }),
            })
          );
        },
      },
      {
        name: "GET /api/buckets/[slug]/media",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          await createMedia({
            bucketId: bucket.id,
            userId: admin.id,
            storedFilename: `stored-${randomUUID()}.txt`,
            filename: `file-${randomUUID()}.txt`,
          });
          const req = new NextRequest(
            `http://localhost/api/buckets/${bucket.slug}/media`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() =>
            listBucketMedia(req, {
              params: Promise.resolve({ slug: bucket.slug }),
            })
          );
        },
      },
      {
        name: "GET /api/buckets/[slug]/stats",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          await createMedia({
            bucketId: bucket.id,
            userId: admin.id,
            storedFilename: `stored-${randomUUID()}.txt`,
            filename: `file-${randomUUID()}.txt`,
          });
          const req = new NextRequest(
            `http://localhost/api/buckets/${bucket.slug}/stats`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() =>
            bucketStats(req, { params: Promise.resolve({ slug: bucket.slug }) })
          );
        },
      },
      {
        name: "GET /api/buckets/[slug]/download",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          const storedFilename = `stored-${randomUUID()}.txt`;
          const filename = `file-${randomUUID()}.txt`;
          const media = await createMedia({
            bucketId: bucket.id,
            userId: admin.id,
            storedFilename,
            filename,
            isAccessible: "PUBLIC",
          });
          await writeBucketFile({
            bucketName: bucket.name,
            filename: storedFilename,
            content: "download",
          });
          const exp = Math.floor(Date.now() / 1000) + 60;
          const tokenParam = signPayload({
            action: "download",
            bucket: bucket.name,
            mediaSlug: media.slug,
            storedFilename,
            filename,
            mimetype: "text/plain",
            path: null,
            exp,
          });
          const req = new NextRequest(
            `http://localhost/api/buckets/${bucket.slug}/download?token=${tokenParam}`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() =>
            downloadBucketFile(req, {
              params: Promise.resolve({ slug: bucket.slug }),
            })
          );
        },
        status: 200,
      },
      {
        name: "GET /api/media/lists",
        run: async () => {
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
          return runReadOnly(() => listMedia(req));
        },
      },
      {
        name: "GET /api/media/properties",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          const media = await createMedia({
            bucketId: bucket.id,
            userId: admin.id,
            storedFilename: `stored-${randomUUID()}.txt`,
            filename: `file-${randomUUID()}.txt`,
          });
          const req = new NextRequest(
            `http://localhost/api/media/properties?slug=${media.slug}`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() => mediaProperties(req));
        },
      },
      {
        name: "GET /api/roles/lists",
        run: async () => {
          const { token } = await seedRoleWithPermission("roles");
          const req = new NextRequest("http://localhost/api/roles/lists", {
            headers: authHeaders(token, true),
          });
          return runReadOnly(() => listRoles(req));
        },
      },
      {
        name: "GET /api/roles/[slug]",
        run: async () => {
          const { role, token } = await seedRoleWithPermission("roles");
          const req = new NextRequest(`http://localhost/api/roles/${role.slug}`, {
            headers: authHeaders(token),
          });
          return runReadOnly(() =>
            getRole(req, { params: Promise.resolve({ slug: role.slug }) })
          );
        },
      },
      {
        name: "GET /api/roles/permissions/[slug]",
        run: async () => {
          const { role, token } = await seedRoleWithPermission("roles");
          const req = new NextRequest(
            `http://localhost/api/roles/permissions/${role.slug}`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() =>
            listRolePermissions(req, {
              params: Promise.resolve({ slug: role.slug }),
            })
          );
        },
      },
      {
        name: "GET /api/permissions/lists",
        run: async () => {
          const { token } = await seedRoleWithPermission("permissions");
          const req = new NextRequest("http://localhost/api/permissions/lists", {
            headers: authHeaders(token, true),
          });
          return runReadOnly(() => listPermissionModules(req));
        },
      },
      {
        name: "GET /api/spaces/folders/[slug]",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          const folder = await createSpace({
            bucketId: bucket.id,
            userId: admin.id,
            name: "Folder",
          });
          const req = new NextRequest(
            `http://localhost/api/spaces/folders/${folder.slug}`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() =>
            getFolderBySlug(req, {
              params: Promise.resolve({ slug: folder.slug }),
            })
          );
        },
      },
      {
        name: "GET /api/spaces/folders/lists",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          await createSpace({
            bucketId: bucket.id,
            userId: admin.id,
            name: "Folder",
          });
          const req = new NextRequest(
            "http://localhost/api/spaces/folders/lists",
            { headers: authHeaders(token, true) }
          );
          return runReadOnly(() => listFolders(req));
        },
      },
      {
        name: "GET /api/spaces/folders/properties",
        run: async () => {
          const { admin, token } = await seedRoleWithPermission("media-library");
          const bucket = await createBucket(admin.id);
          const folder = await createSpace({
            bucketId: bucket.id,
            userId: admin.id,
            name: "Folder",
          });
          const req = new NextRequest(
            `http://localhost/api/spaces/folders/properties?slug=${folder.slug}`,
            { headers: authHeaders(token) }
          );
          return runReadOnly(() => folderProperties(req));
        },
      },
      {
        name: "GET /api/users/lists",
        run: async () => {
          const { token } = await seedRoleWithPermission("users");
          const req = new NextRequest("http://localhost/api/users/lists", {
            headers: authHeaders(token, true),
          });
          return runReadOnly(() => listUsers(req));
        },
      },
      {
        name: "GET /api/users/[slug]",
        run: async () => {
          const { token } = await seedRoleWithPermission("users");
          const user = await prisma.user.create({
            data: {
              name: "Read User",
              email: `read-${randomUUID()}@test.local`,
              password: "password",
              profilePicture: "",
            },
          });
          const req = new NextRequest(
            `http://localhost/api/users/${user.slug}`,
            { headers: authHeaders(token, true) }
          );
          return runReadOnly(() =>
            getUser(req, { params: Promise.resolve({ slug: user.slug }) })
          );
        },
      },
      {
        name: "GET /api/docs/json",
        run: async () => {
          const { token } = await seedRoleWithPermission("users");
          const req = new NextRequest("http://localhost/api/docs/json", {
            headers: authHeaders(token),
          });
          return runReadOnly(() => getDocsJson(req));
        },
      },
    ];

    for (const entry of cases) {
      it(entry.name, async () => {
        const { res, before } = await entry.run();
        const status = entry.status ?? 200;
        expect(res.status).toBe(status);
        const after = await snapshotDbCounts();
        expectNoDbChanges(before, after);
      });
    }
  });

  describe("Mutations are idempotent or explicitly fail", () => {
    it("PATCH /api/assign-role/update/[slug] is safe to repeat", async () => {
      const { admin, role, token, permissionModule } =
        await seedRoleWithPermission("users");
      await prisma.rolePermission.upsert({
        where: {
          roleId_moduleId: { roleId: role.id, moduleId: permissionModule.id },
        },
        update: { create: true, read: true, update: true, delete: true },
        create: {
          roleId: role.id,
          moduleId: permissionModule.id,
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      });
      const keepUser = await createUser({ roleId: role.id });
      const addUser = await createUser({ roleId: null });
      const body = { users: [admin.id, keepUser.id, addUser.id] };

      const req = jsonRequest(
        `http://localhost/api/assign-role/update/${role.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await updateRoleUsers(req, {
        params: Promise.resolve({ slug: role.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/assign-role/update/${role.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await updateRoleUsers(retry, {
        params: Promise.resolve({ slug: role.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/buckets/[slug]/archive is idempotent", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const req = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/archive`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const res = await archiveBucket(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 200);

      const retry = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/archive`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const retryRes = await archiveBucket(retry, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("POST /api/buckets/[slug]/cleanup is safe to repeat", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);

      const req = jsonRequest(
        `http://localhost/api/buckets/${bucket.slug}/cleanup`,
        {
          method: "POST",
          headers: authHeaders(token),
          body: { confirm: true, bucketSlug: bucket.slug },
        }
      );
      const res = await cleanupBucket(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/buckets/${bucket.slug}/cleanup`,
        {
          method: "POST",
          headers: authHeaders(token),
          body: { confirm: true, bucketSlug: bucket.slug },
        }
      );
      const retryRes = await cleanupBucket(retry, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/buckets/[slug]/delete is idempotent", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const req = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/delete`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const res = await deleteBucket(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 200);

      const retry = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/delete`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const retryRes = await deleteBucket(retry, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/buckets/[slug]/restore is idempotent", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      await prisma.bucket.update({
        where: { id: bucket.id },
        data: { isAvailable: "REMOVE" },
      });
      const req = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/restore`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const res = await restoreBucket(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 200);

      const retry = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/restore`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const retryRes = await restoreBucket(retry, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/buckets/[slug]/regenerate-access-key is safe to repeat", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const req = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/regenerate-access-key`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const res = await regenerateBucketKey(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      const first = (await expectJson(res, 200)) as {
        bucket: { accessKeyId: string; secretAccessKey: string };
      };

      const retry = new NextRequest(
        `http://localhost/api/buckets/${bucket.slug}/regenerate-access-key`,
        { method: "PATCH", headers: authHeaders(token) }
      );
      const retryRes = await regenerateBucketKey(retry, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      const second = (await expectJson(retryRes, 200)) as {
        bucket: { accessKeyId: string; secretAccessKey: string };
      };
      expect(second.bucket.accessKeyId).not.toBe(first.bucket.accessKeyId);
      expect(second.bucket.secretAccessKey).not.toBe(
        first.bucket.secretAccessKey
      );
    });

    it("PATCH /api/buckets/[slug]/rename accepts repeated name", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const newName = `rename-${randomUUID()}`;

      const req = jsonRequest(
        `http://localhost/api/buckets/${bucket.slug}/rename`,
        { method: "PATCH", headers: authHeaders(token), body: { name: newName } }
      );
      const res = await renameBucket(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/buckets/${bucket.slug}/rename`,
        { method: "PATCH", headers: authHeaders(token), body: { name: newName } }
      );
      const retryRes = await renameBucket(retry, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/buckets/[slug]/update-permission is idempotent", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const body = { permission: "READ" };
      const req = jsonRequest(
        `http://localhost/api/buckets/${bucket.slug}/update-permission`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await updateBucketPermission(req, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/buckets/${bucket.slug}/update-permission`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await updateBucketPermission(retry, {
        params: Promise.resolve({ slug: bucket.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/roles/permissions/update/[slug] is idempotent", async () => {
      const { token, permissionModule } = await seedRoleWithPermission("roles");
      const targetRole = await prisma.role.create({
        data: { name: `TargetRole-${randomUUID()}` },
      });
      await prisma.rolePermission.create({
        data: {
          roleId: targetRole.id,
          moduleId: permissionModule.id,
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      });
      const body = {
        permissions: [
          {
            moduleId: permissionModule.id,
            create: true,
            read: true,
            update: false,
            delete: false,
          },
        ],
      };
      const req = jsonRequest(
        `http://localhost/api/roles/permissions/update/${targetRole.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await updateRolePermissions(req, {
        params: Promise.resolve({ slug: targetRole.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/roles/permissions/update/${targetRole.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await updateRolePermissions(retry, {
        params: Promise.resolve({ slug: targetRole.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/roles/update/[slug] is idempotent", async () => {
      const { role, token } = await seedRoleWithPermission("roles");
      const body = { name: "Same Role Name" };
      const req = jsonRequest(
        `http://localhost/api/roles/update/${role.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await updateRole(req, {
        params: Promise.resolve({ slug: role.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/roles/update/${role.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await updateRole(retry, {
        params: Promise.resolve({ slug: role.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/users/status/[slug] is idempotent", async () => {
      const { token } = await seedRoleWithPermission("users");
      const user = await prisma.user.create({
        data: {
          name: "Status User",
          email: `status-${randomUUID()}@test.local`,
          password: "password",
          profilePicture: "",
        },
      });
      const body = { isActive: false };
      const req = jsonRequest(
        `http://localhost/api/users/status/${user.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await updateUserStatus(req, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/users/status/${user.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await updateUserStatus(retry, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/users/assign-role/[slug]/role is idempotent", async () => {
      const { role, token } = await seedRoleWithPermission("users");
      const user = await prisma.user.create({
        data: {
          name: "Assign User",
          email: `assign-${randomUUID()}@test.local`,
          password: "password",
          profilePicture: "",
        },
      });
      const body = { roleId: role.id };
      const req = jsonRequest(
        `http://localhost/api/users/assign-role/${user.slug}/role`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await assignUserRole(req, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/users/assign-role/${user.slug}/role`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await assignUserRole(retry, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/users/reset-password/[slug]/reset is safe to repeat", async () => {
      const { token } = await seedRoleWithPermission("users");
      const user = await prisma.user.create({
        data: {
          name: "Reset User",
          email: `reset-${randomUUID()}@test.local`,
          password: "password",
          profilePicture: "",
        },
      });
      const body = { newPassword: "newpass123" };
      const req = jsonRequest(
        `http://localhost/api/users/reset-password/${user.slug}/reset`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await resetUserPassword(req, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/users/reset-password/${user.slug}/reset`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await resetUserPassword(retry, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("PATCH /api/users/update/[slug] is idempotent", async () => {
      const { token } = await seedRoleWithPermission("users");
      const user = await prisma.user.create({
        data: {
          name: "Update User",
          email: `update-${randomUUID()}@test.local`,
          password: "password",
          profilePicture: "",
        },
      });
      const body = { name: "Updated Name" };
      const req = jsonRequest(
        `http://localhost/api/users/update/${user.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const res = await updateUser(req, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(res, 200);

      const retry = jsonRequest(
        `http://localhost/api/users/update/${user.slug}`,
        { method: "PATCH", headers: authHeaders(token), body }
      );
      const retryRes = await updateUser(retry, {
        params: Promise.resolve({ slug: user.slug }),
      });
      await expectJson(retryRes, 200);
    });

    it("POST /api/spaces/folders/delete returns 404 on repeated delete", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const folder = await createSpace({
        bucketId: bucket.id,
        userId: admin.id,
        name: "DeleteFolder",
      });
      const body = { folderId: folder.id };
      const req = jsonRequest(
        "http://localhost/api/spaces/folders/delete",
        { method: "POST", headers: authHeaders(token), body }
      );
      const res = await deleteFolder(req);
      await expectJson(res, 200);

      const retry = jsonRequest(
        "http://localhost/api/spaces/folders/delete",
        { method: "POST", headers: authHeaders(token), body }
      );
      const retryRes = await deleteFolder(retry);
      await expectJson(retryRes, 404);
    });

    it("POST /api/spaces/folders/move is idempotent", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const folder = await createSpace({
        bucketId: bucket.id,
        userId: admin.id,
        name: "MoveFolder",
      });
      const target = await createSpace({
        bucketId: bucket.id,
        userId: admin.id,
        name: "TargetFolder",
      });
      const body = { folderId: folder.id, newParentId: target.id };
      const req = jsonRequest("http://localhost/api/spaces/folders/move", {
        method: "POST",
        headers: authHeaders(token),
        body,
      });
      const res = await moveFolder(req);
      await expectJson(res, 200);

      const retry = jsonRequest("http://localhost/api/spaces/folders/move", {
        method: "POST",
        headers: authHeaders(token),
        body,
      });
      const retryRes = await moveFolder(retry);
      await expectJson(retryRes, 200);
    });

    it("POST /api/spaces/folders/rename returns validation error on repeat", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const folder = await createSpace({
        bucketId: bucket.id,
        userId: admin.id,
        name: "RenameFolder",
      });
      const newName = "RenamedFolder";
      const body = { folderId: folder.id, name: newName };
      const req = jsonRequest("http://localhost/api/spaces/folders/rename", {
        method: "POST",
        headers: authHeaders(token),
        body,
      });
      const res = await renameFolder(req);
      await expectJson(res, 200);

      const retry = jsonRequest("http://localhost/api/spaces/folders/rename", {
        method: "POST",
        headers: authHeaders(token),
        body,
      });
      const retryRes = await renameFolder(retry);
      await expectJson(retryRes, 400);
    });

    it("POST /api/media/delete is idempotent", async () => {
      const { admin, token } = await seedRoleWithPermission("media-library");
      const bucket = await createBucket(admin.id);
      const media = await createMedia({
        bucketId: bucket.id,
        userId: admin.id,
        storedFilename: `stored-${randomUUID()}.txt`,
        filename: `file-${randomUUID()}.txt`,
      });
      const body = { slug: media.slug };
      const req = jsonRequest("http://localhost/api/media/delete", {
        method: "POST",
        headers: authHeaders(token),
        body,
      });
      const res = await deleteMedia(req);
      await expectJson(res, 200);

      const retry = jsonRequest("http://localhost/api/media/delete", {
        method: "POST",
        headers: authHeaders(token),
        body,
      });
      const retryRes = await deleteMedia(retry);
      await expectJson(retryRes, 200);
    });
  });
});
