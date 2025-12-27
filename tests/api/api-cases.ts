import { NextRequest } from "next/server";
import { expect } from "vitest";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import path from "path";
import * as fs from "fs/promises";
import type { HttpMethod } from "@/tests/helpers/api-routes";
import { seedAuthRole, seedRoleWithPermission } from "@/tests/helpers/seed";
import {
  buildMultipartBody,
  createBucket,
  createMedia,
  createSpace,
  ensureStorageRoot,
  writeBucketFile,
} from "@/tests/helpers/api-fixtures";
import { GET as listRoleUsers } from "@/app/api/assign-role/lists/[slug]/route";
import { PATCH as updateRoleUsers } from "@/app/api/assign-role/update/[slug]/route";
import { POST as login } from "@/app/api/auth/login/route";
import { POST as logout } from "@/app/api/auth/logout/route";
import { GET as getAuthMe } from "@/app/api/auth/me/route";
import { GET as getBucketDetail } from "@/app/api/buckets/[slug]/route";
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
import { GET as getDocsJson } from "@/app/api/docs/json/route";
import { POST as multiUpload } from "@/app/api/multiple-upload/upload/route";
import { signPayload, verifyPayload } from "@/lib/signedUrl";
import prisma from "@/lib/prisma";

export type BuildResult = {
  req: NextRequest;
  params?: Record<string, string>;
};

type BivariantCallback<T extends (...args: never[]) => unknown> = {
  bivarianceHack: T;
}["bivarianceHack"];

export type ApiCase = {
  name: string;
  method: HttpMethod;
  route: string;
  todo?: boolean;
  skip?: boolean;
  source?: string;
  handler?:
    | BivariantCallback<
        (
          req: NextRequest,
          ctx: { params: Promise<Record<string, string>> }
        ) => Promise<Response>
      >
    | unknown;
  build?: () => Promise<BuildResult> | BuildResult;
  expectStatus?: number;
  expectJson?: boolean;
  verify?: (res: Response) => Promise<void> | void;
};

export const apiCases: ApiCase[] = [
  {
    name: "lists returns users assigned to a role",
    method: "GET",
    route: "/api/assign-role/lists/[slug]",
    handler: listRoleUsers,
    build: async () => {
      const { role, token } = await seedAuthRole();
      const req = new NextRequest(
        `http://localhost/api/assign-role/lists/${role.slug}`,
        {
          headers: {
            "x-ui-request": "true",
            cookie: `session=${token}`,
          },
        }
      );
      return { req, params: { slug: role.slug } };
    },
    expectStatus: 200,
    verify: async (res) => {
      const body = await res.json();
      expect(Array.isArray(body.data)).toBe(true);
    },
  },
  (() => {
    let updateState: {
      keepId: number;
      removeId: number;
      addId: number;
      roleId: number;
    } | null = null;

    return {
      name: "update role assignments",
      method: "PATCH",
      route: "/api/assign-role/update/[slug]",
      handler: updateRoleUsers,
      build: async () => {
        const { role, token } = await seedAuthRole();
        const keepUser = await prisma.user.create({
          data: {
            name: "Keep User",
            email: `keep-${Date.now()}@test.local`,
            password: "test-password",
            profilePicture: "",
            roleId: role.id,
            fullNameEn: "Keep User",
          },
        });
        const removeUser = await prisma.user.create({
          data: {
            name: "Remove User",
            email: `remove-${Date.now()}@test.local`,
            password: "test-password",
            profilePicture: "",
            roleId: role.id,
            fullNameEn: "Remove User",
          },
        });
        const addUser = await prisma.user.create({
          data: {
            name: "Add User",
            email: `add-${Date.now()}@test.local`,
            password: "test-password",
            profilePicture: "",
            roleId: null,
            fullNameEn: "Add User",
          },
        });

        updateState = {
          keepId: keepUser.id,
          removeId: removeUser.id,
          addId: addUser.id,
          roleId: role.id,
        };

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

        return { req, params: { slug: role.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        if (!updateState) {
          throw new Error("Missing update state for role assignment test.");
        }

        const [keep, remove, add] = await Promise.all([
          prisma.user.findUnique({
            where: { id: updateState.keepId },
            select: { roleId: true },
          }),
          prisma.user.findUnique({
            where: { id: updateState.removeId },
            select: { roleId: true },
          }),
          prisma.user.findUnique({
            where: { id: updateState.addId },
            select: { roleId: true },
          }),
        ]);

        expect(keep?.roleId).toBe(updateState.roleId);
        expect(remove?.roleId).toBeNull();
        expect(add?.roleId).toBe(updateState.roleId);
      },
    } satisfies ApiCase;
  })(),
  {
    name: "login returns session cookie",
    method: "POST",
    route: "/api/auth/login",
    handler: login,
    build: async () => {
      const email = `login-${Date.now()}@test.local`;
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

      const req = new NextRequest("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      return { req };
    },
    expectStatus: 200,
    verify: async (res) => {
      const setCookie = res.headers.get("set-cookie") || "";
      expect(setCookie).toContain("session=");
    },
  },
  {
    name: "logout clears session cookie",
    method: "POST",
    route: "/api/auth/logout",
    handler: logout,
    build: () => {
      const req = new NextRequest("http://localhost/api/auth/logout", {
        method: "POST",
      });
      return { req };
    },
    expectStatus: 200,
    verify: async (res) => {
      const setCookie = res.headers.get("set-cookie") || "";
      expect(setCookie).toContain("session=");
      expect(setCookie).toContain("Max-Age=0");
    },
  },
  (() => {
    let token = "";
    let email = "";

    return {
      name: "me returns authenticated user",
      method: "GET",
      route: "/api/auth/me",
      handler: getAuthMe,
      build: async () => {
        const seeded = await seedAuthRole();
        token = seeded.token;
        email = seeded.admin.email;

        const req = new NextRequest("http://localhost/api/auth/me", {
          headers: { cookie: `session=${token}` },
        });

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.user?.email).toBe(email);
        expect(body.user?.permissions?.users?.read).toBe(true);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";
    let folderName = "";
    let mediaName = "";

    return {
      name: "bucket detail returns folders and media",
      method: "GET",
      route: "/api/buckets/[slug]",
      handler: getBucketDetail,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;
        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        folderName = folder.name;
        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaName = media.filename;

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}`,
          {
            headers: { cookie: `session=${token}` },
          }
        );
        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.bucket?.slug).toBe(bucketSlug);
        const folderNames = (body.folders || []).map((f: { name: string }) =>
          f.name
        );
        expect(folderNames).toContain(folderName);
        const mediaNames = (body.media?.items || []).map(
          (m: { name: string }) => m.name
        );
        expect(mediaNames).toContain(mediaName);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketId = 0;

    return {
      name: "archive bucket marks as removed",
      method: "PATCH",
      route: "/api/buckets/[slug]/archive",
      handler: archiveBucket,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketId = bucket.id;

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/archive`,
          {
            method: "PATCH",
            headers: { cookie: `session=${token}` },
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.bucket.findUnique({
          where: { id: bucketId },
          select: { isAvailable: true },
        });
        expect(updated?.isAvailable).toBe("REMOVE");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketId = 0;
    let bucketSlug = "";
    let bucketName = "";
    let mediaCount = 0;
    let folderCount = 0;

    return {
      name: "cleanup bucket removes media and folders",
      method: "POST",
      route: "/api/buckets/[slug]/cleanup",
      handler: cleanupBucket,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketId = bucket.id;
        bucketSlug = bucket.slug;
        bucketName = bucket.name;

        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        folderCount = folder ? 1 : 0;

        await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaCount = 1;

        const root = await ensureStorageRoot();
        const bucketDir = path.join(root, bucket.name);
        await fs.mkdir(bucketDir, { recursive: true });
        await fs.writeFile(path.join(bucketDir, "keep.txt"), "cleanup");

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/cleanup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ confirm: true, bucketSlug: bucket.slug }),
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.status).toBe("ok");
        expect(body.bucket).toBe(bucketName);
        expect(body.removedMedia).toBe(mediaCount);
        expect(body.removedFolders).toBe(folderCount);

        const [mediaLeft, foldersLeft] = await Promise.all([
          prisma.media.count({ where: { bucketId } }),
          prisma.space.count({ where: { bucketId } }),
        ]);
        expect(mediaLeft).toBe(0);
        expect(foldersLeft).toBe(0);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketId = 0;
    let folderName = "";

    return {
      name: "create folder adds space record",
      method: "POST",
      route: "/api/buckets/[slug]/create-folder",
      handler: createBucketFolder,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketId = bucket.id;
        folderName = "Reports";

        await ensureStorageRoot();

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/create-folder`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ name: folderName }),
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const folder = await prisma.space.findFirst({
          where: { bucketId, name: folderName },
        });
        expect(folder).not.toBeNull();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketId = 0;
    let spaceId = 0;
    let mediaId = 0;

    return {
      name: "delete bucket marks records removed",
      method: "PATCH",
      route: "/api/buckets/[slug]/delete",
      handler: deleteBucket,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketId = bucket.id;

        const space = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        spaceId = space.id;

        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaId = media.id;

        await ensureStorageRoot();

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/delete`,
          {
            method: "PATCH",
            headers: { cookie: `session=${token}` },
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const [bucket, space, media] = await Promise.all([
          prisma.bucket.findUnique({
            where: { id: bucketId },
            select: { isAvailable: true },
          }),
          prisma.space.findUnique({
            where: { id: spaceId },
            select: { isAvailable: true },
          }),
          prisma.media.findUnique({
            where: { id: mediaId },
            select: { isVisibility: true },
          }),
        ]);
        expect(bucket?.isAvailable).toBe("REMOVE");
        expect(space?.isAvailable).toBe("REMOVE");
        expect(media?.isVisibility).toBe("REMOVE");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let token = "";
    let bucketSlug = "";
    let storedFilename = "";
    let filename = "";
    let bucketName = "";
    let mediaSlug = "";
    let fileContent = "download";

    return {
      name: "download returns file content",
      method: "GET",
      route: "/api/buckets/[slug]/download",
      handler: downloadBucketFile,
      expectJson: false,
      build: async () => {
        const { admin, token: authToken } = await seedRoleWithPermission(
          "media-library"
        );
        token = authToken;
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;
        bucketName = bucket.name;
        storedFilename = `stored-${randomUUID()}.txt`;
        filename = `file-${randomUUID()}.txt`;

        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename,
          filename,
          isAccessible: "PUBLIC",
        });
        mediaSlug = media.slug;

        const root = await ensureStorageRoot();
        const bucketDir = path.join(root, bucket.name);
        await fs.mkdir(bucketDir, { recursive: true });
        await fs.writeFile(path.join(bucketDir, storedFilename), fileContent);

        const exp = Math.floor(Date.now() / 1000) + 60;
        const tokenParam = signPayload({
          action: "download",
          bucket: bucketName,
          mediaSlug,
          storedFilename,
          filename,
          mimetype: "text/plain",
          path: null,
          exp,
        });

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/download?token=${tokenParam}&inline=true`,
          {
            headers: { cookie: `session=${token}` },
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        expect(res.headers.get("content-type")).toBe("text/plain");
        const body = await res.text();
        expect(body).toBe(fileContent);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let parentSlug = "";
    let childName = "";
    let mediaName = "";

    return {
      name: "folder returns child folders and media",
      method: "GET",
      route: "/api/buckets/[slug]/folder",
      handler: listBucketFolder,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);

        const parent = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Parent-${randomUUID()}`,
        });
        parentSlug = parent.slug;

        const child = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          parentId: parent.id,
          name: `Child-${randomUUID()}`,
        });
        childName = child.name;

        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          pathName: parent.name,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaName = media.filename;

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/folder?parentSlug=${parent.slug}`,
          {
            headers: { cookie: `session=${token}` },
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const folderNames = (body.folders || []).map((f: { name: string }) =>
          f.name
        );
        const mediaNames = (body.media?.items || []).map(
          (m: { name: string }) => m.name
        );
        expect(folderNames).toContain(childName);
        expect(mediaNames).toContain(mediaName);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";
    let mediaName = "";

    return {
      name: "bucket media lists items",
      method: "GET",
      route: "/api/buckets/[slug]/media",
      handler: listBucketMedia,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;

        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaName = media.filename;

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/media`,
          { headers: { cookie: `session=${token}` } }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.bucket?.slug).toBe(bucketSlug);
        const names = (body.media?.items || []).map(
          (m: { name: string }) => m.name
        );
        expect(names).toContain(mediaName);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";
    let newName = "";

    return {
      name: "rename bucket updates name and directory",
      method: "PATCH",
      route: "/api/buckets/[slug]/rename",
      handler: renameBucket,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;
        newName = `renamed-${randomUUID()}`;

        const root = await ensureStorageRoot();
        await fs.mkdir(path.join(root, bucket.name), { recursive: true });

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/rename`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ name: newName }),
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.bucket.findUnique({
          where: { slug: bucketSlug },
          select: { name: true },
        });
        expect(updated?.name).toBe(newName);
        const root = await ensureStorageRoot();
        await fs.access(path.join(root, newName));
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";

    return {
      name: "restore bucket sets available",
      method: "PATCH",
      route: "/api/buckets/[slug]/restore",
      handler: restoreBucket,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;
        await prisma.bucket.update({
          where: { id: bucket.id },
          data: { isAvailable: "REMOVE" },
        });

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/restore`,
          { method: "PATCH", headers: { cookie: `session=${token}` } }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.bucket.findUnique({
          where: { slug: bucketSlug },
          select: { isAvailable: true },
        });
        expect(updated?.isAvailable).toBe("AVAILABLE");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";

    return {
      name: "signed url generates download token",
      method: "POST",
      route: "/api/buckets/[slug]/signed-url",
      handler: generateSignedUrl,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;

        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
          isAccessible: "PUBLIC",
        });

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/signed-url`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ action: "download", mediaSlug: media.slug }),
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.url).toContain(`/api/buckets/${bucketSlug}/download?token=`);
        expect(typeof body.token).toBe("string");
        const payload = verifyPayload(body.token);
        expect(payload?.action).toBe("download");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";

    return {
      name: "bucket stats aggregates media size",
      method: "GET",
      route: "/api/buckets/[slug]/stats",
      handler: bucketStats,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;

        await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
          size: 10,
        });
        await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
          size: 20,
        });

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/stats`,
          { headers: { cookie: `session=${token}` } }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.bucket).toBeTruthy();
        expect(body.mediaCount).toBe(2);
        expect(body.totalBytes).toBe(30);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";

    return {
      name: "update permission changes bucket access",
      method: "PATCH",
      route: "/api/buckets/[slug]/update-permission",
      handler: updateBucketPermission,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/update-permission`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ permission: "READ" }),
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.bucket.findUnique({
          where: { slug: bucketSlug },
          select: { permission: true },
        });
        expect(updated?.permission).toBe("READ");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketId = 0;

    return {
      name: "upload stores media record",
      method: "POST",
      route: "/api/buckets/[slug]/upload",
      handler: uploadBucketFile,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketId = bucket.id;
        await ensureStorageRoot();

        const { body, boundary } = buildMultipartBody({
          files: [
            {
              name: "files",
              filename: "sample.txt",
              contentType: "text/plain",
              content: "hello upload",
            },
          ],
        });

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/upload`,
          {
            method: "POST",
            headers: {
              "content-type": `multipart/form-data; boundary=${boundary}`,
              cookie: `session=${token}`,
            },
            body,
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 201,
      verify: async () => {
        const count = await prisma.media.count({
          where: { bucketId },
        });
        expect(count).toBe(1);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketId = 0;
    let adminId = 0;

    return {
      name: "upload-signed stores media record",
      method: "POST",
      route: "/api/buckets/[slug]/upload-signed",
      handler: uploadBucketSigned,
      build: async () => {
        const { admin } = await seedRoleWithPermission("media-library");
        adminId = admin.id;
        const bucket = await createBucket(admin.id);
        bucketId = bucket.id;
        await ensureStorageRoot();

        const exp = Math.floor(Date.now() / 1000) + 60;
        const token = signPayload({
          action: "upload",
          bucket: bucket.name,
          filename: "signed.txt",
          userId: admin.id,
          exp,
        });

        const { body, boundary } = buildMultipartBody({
          files: [
            {
              name: "file",
              filename: "signed.txt",
              contentType: "text/plain",
              content: "signed upload",
            },
          ],
        });

        const req = new NextRequest(
          `http://localhost/api/buckets/${bucket.slug}/upload-signed?token=${token}`,
          {
            method: "POST",
            headers: {
              "content-type": `multipart/form-data; boundary=${boundary}`,
            },
            body,
          }
        );

        return { req, params: { slug: bucket.slug } };
      },
      expectStatus: 201,
      verify: async () => {
        const media = await prisma.media.findFirst({
          where: { bucketId, uploadedById: adminId },
        });
        expect(media).not.toBeNull();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let createdName = "";

    return {
      name: "add bucket creates record",
      method: "POST",
      route: "/api/buckets/add",
      handler: addBucket,
      build: async () => {
        const { token } = await seedRoleWithPermission("media-library");
        const rawName = `NewBucket-${randomUUID()}`;
        createdName = rawName.toLowerCase().replace(/[^a-z0-9-_]/g, "-");
        await ensureStorageRoot();

        const req = new NextRequest("http://localhost/api/buckets/add", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({ name: rawName, permission: "FULL_ACCESS" }),
        });

        return { req };
      },
      expectStatus: 201,
      verify: async () => {
        const bucket = await prisma.bucket.findUnique({
          where: { name: createdName },
        });
        expect(bucket).not.toBeNull();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketSlug = "";

    return {
      name: "list buckets includes created bucket",
      method: "GET",
      route: "/api/buckets/lists",
      handler: listBuckets,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        bucketSlug = bucket.slug;

        const req = new NextRequest("http://localhost/api/buckets/lists", {
          headers: {
            "x-ui-request": "true",
            cookie: `session=${token}`,
          },
        });

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const slugs = (body.buckets || []).map((b: { slug: string }) => b.slug);
        expect(slugs).toContain(bucketSlug);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let newMediaSlug = "";
    let targetBucketName = "";
    let targetFolder = "copied";
    let newStoredFilename = "";

    return {
      name: "copy media creates new record and file",
      method: "POST",
      route: "/api/media/copy",
      handler: copyMedia,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const sourceBucket = await createBucket(admin.id);
        const targetBucket = await createBucket(admin.id);
        targetBucketName = targetBucket.name;

        const storedFilename = `stored-${randomUUID()}.txt`;
        const media = await createMedia({
          bucketId: sourceBucket.id,
          userId: admin.id,
          storedFilename,
          filename: `file-${randomUUID()}.txt`,
        });

        await writeBucketFile({
          bucketName: sourceBucket.name,
          filename: storedFilename,
          content: "copy-source",
        });

        const req = new NextRequest("http://localhost/api/media/copy", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({
            mediaSlug: media.slug,
            targetBucketSlug: targetBucket.slug,
            targetPath: targetFolder,
          }),
        });

        return { req };
      },
      expectStatus: 201,
      verify: async (res) => {
        const body = await res.json();
        newMediaSlug = body.media?.slug;
        newStoredFilename = body.media?.storedFilename;
        expect(body.media?.bucketId).toBeTruthy();
        expect(newStoredFilename).toBeTruthy();

        const copied = await prisma.media.findUnique({
          where: { slug: newMediaSlug },
          select: { bucket: { select: { name: true } } },
        });
        expect(copied?.bucket?.name).toBe(targetBucketName);

        await fs.access(
          path.join(
            await ensureStorageRoot(),
            targetBucketName,
            targetFolder,
            newStoredFilename
          )
        );
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let mediaSlug = "";
    let targetBucketName = "";
    let targetFolder = "moved";
    let storedFilename = "";
    let sourceBucketName = "";

    return {
      name: "move media updates record and filesystem",
      method: "POST",
      route: "/api/media/move",
      handler: moveMedia,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const sourceBucket = await createBucket(admin.id);
        const targetBucket = await createBucket(admin.id);
        sourceBucketName = sourceBucket.name;
        targetBucketName = targetBucket.name;

        storedFilename = `stored-${randomUUID()}.txt`;
        const media = await createMedia({
          bucketId: sourceBucket.id,
          userId: admin.id,
          storedFilename,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaSlug = media.slug;

        await writeBucketFile({
          bucketName: sourceBucket.name,
          filename: storedFilename,
          content: "move-source",
        });

        const req = new NextRequest("http://localhost/api/media/move", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({
            mediaSlug: media.slug,
            targetBucketSlug: targetBucket.slug,
            targetPath: targetFolder,
          }),
        });

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.media.findUnique({
          where: { slug: mediaSlug },
          select: { bucket: { select: { name: true } }, path: true },
        });
        expect(updated?.bucket?.name).toBe(targetBucketName);
        expect(updated?.path).toBe(targetFolder);

        const root = await ensureStorageRoot();
        await fs.access(
          path.join(root, targetBucketName, targetFolder, storedFilename)
        );
        await expect(
          fs.access(path.join(root, sourceBucketName, storedFilename))
        ).rejects.toBeTruthy();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let mediaSlug = "";

    return {
      name: "delete media marks visibility removed",
      method: "POST",
      route: "/api/media/delete",
      handler: deleteMedia,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaSlug = media.slug;

        const req = new NextRequest("http://localhost/api/media/delete", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({ slug: media.slug }),
        });

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.media.findUnique({
          where: { slug: mediaSlug },
          select: { isVisibility: true },
        });
        expect(updated?.isVisibility).toBe("REMOVE");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let mediaName = "";

    return {
      name: "media list includes created media",
      method: "GET",
      route: "/api/media/lists",
      handler: listMedia,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaName = media.filename;

        const req = new NextRequest("http://localhost/api/media/lists", {
          headers: {
            "x-ui-request": "true",
            cookie: `session=${token}`,
          },
        });

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const names = (body.data || []).map((m: { name: string }) => m.name);
        expect(names).toContain(mediaName);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let mediaSlug = "";

    return {
      name: "media properties returns details",
      method: "GET",
      route: "/api/media/properties",
      handler: mediaProperties,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const media = await createMedia({
          bucketId: bucket.id,
          userId: admin.id,
          storedFilename: `stored-${randomUUID()}.txt`,
          filename: `file-${randomUUID()}.txt`,
        });
        mediaSlug = media.slug;

        const req = new NextRequest(
          `http://localhost/api/media/properties?slug=${media.slug}`,
          {
            headers: { cookie: `session=${token}` },
          }
        );

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.media?.slug).toBe(mediaSlug);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let roleSlug = "";

    return {
      name: "get role returns role data",
      method: "GET",
      route: "/api/roles/[slug]",
      handler: getRole,
      build: async () => {
        const { role, token } = await seedRoleWithPermission("roles");
        roleSlug = role.slug;

        const req = new NextRequest(
          `http://localhost/api/roles/${role.slug}`,
          { headers: { cookie: `session=${token}` } }
        );

        return { req, params: { slug: role.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.data?.slug).toBe(roleSlug);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let roleName = "";
    let moduleCount = 0;

    return {
      name: "add role creates default permissions",
      method: "POST",
      route: "/api/roles/add",
      handler: addRole,
      build: async () => {
        const { token } = await seedRoleWithPermission("roles");
        await prisma.permissionModule.create({
          data: {
            name: `module-${randomUUID()}`,
            label: "Extra Module",
            description: "Extra module",
          },
        });
        moduleCount = await prisma.permissionModule.count();
        roleName = `Role-${randomUUID()}`;

        const req = new NextRequest("http://localhost/api/roles/add", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({ name: roleName, description: "New role" }),
        });

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const role = await prisma.role.findUnique({
          where: { name: roleName },
        });
        expect(role).not.toBeNull();

        const permissions = await prisma.rolePermission.count({
          where: { roleId: role!.id },
        });
        expect(permissions).toBe(moduleCount);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let roleSlug = "";

    return {
      name: "list roles includes created role",
      method: "GET",
      route: "/api/roles/lists",
      handler: listRoles,
      build: async () => {
        const { role, token } = await seedRoleWithPermission("roles");
        roleSlug = role.slug;

        const req = new NextRequest("http://localhost/api/roles/lists", {
          headers: {
            "x-ui-request": "true",
            cookie: `session=${token}`,
          },
        });

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const slugs = (body.data || []).map((r: { slug: string }) => r.slug);
        expect(slugs).toContain(roleSlug);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let roleSlug = "";
    let moduleName = "";

    return {
      name: "role permissions lists modules",
      method: "GET",
      route: "/api/roles/permissions/[slug]",
      handler: listRolePermissions,
      build: async () => {
        const { role, token, permissionModule } =
          await seedRoleWithPermission("roles");
        roleSlug = role.slug;
        moduleName = permissionModule.name;

        const req = new NextRequest(
          `http://localhost/api/roles/permissions/${role.slug}`,
          { headers: { cookie: `session=${token}` } }
        );

        return { req, params: { slug: role.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const modules = (body.permissions || []).map(
          (p: { module?: { name?: string } }) => p.module?.name
        );
        expect(modules).toContain(moduleName);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let roleSlug = "";
    let moduleId = 0;

    return {
      name: "update role permissions updates flags",
      method: "PATCH",
      route: "/api/roles/permissions/update/[slug]",
      handler: updateRolePermissions,
      build: async () => {
        const { role, token, permissionModule } =
          await seedRoleWithPermission("roles");
        roleSlug = role.slug;
        moduleId = permissionModule.id;

        const req = new NextRequest(
          `http://localhost/api/roles/permissions/update/${role.slug}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({
              permissions: [
                {
                  moduleId,
                  create: true,
                  read: true,
                  update: false,
                  delete: false,
                },
              ],
            }),
          }
        );

        return { req, params: { slug: role.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.rolePermission.findUnique({
          where: {
            roleId_moduleId: {
              roleId: (await prisma.role.findUnique({
                where: { slug: roleSlug },
                select: { id: true },
              }))!.id,
              moduleId,
            },
          },
        });
        expect(updated?.update).toBe(false);
        expect(updated?.read).toBe(true);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let targetRoleId = 0;
    let moduleId = 0;

    return {
      name: "clone role permissions copies flags",
      method: "POST",
      route: "/api/roles/permissions/clone/[id]/permissions",
      handler: cloneRolePermissions,
      build: async () => {
        const { token, permissionModule } =
          await seedRoleWithPermission("roles");
        moduleId = permissionModule.id;

        const sourceRole = await prisma.role.create({
          data: { name: `SourceRole-${randomUUID()}` },
        });
        const targetRole = await prisma.role.create({
          data: { name: `TargetRole-${randomUUID()}` },
        });
        targetRoleId = targetRole.id;

        await prisma.rolePermission.create({
          data: {
            roleId: sourceRole.id,
            moduleId,
            create: true,
            read: true,
            update: false,
            delete: false,
          },
        });
        await prisma.rolePermission.create({
          data: {
            roleId: targetRole.id,
            moduleId,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        });

        const req = new NextRequest(
          `http://localhost/api/roles/permissions/clone/${targetRole.id}/permissions`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ fromRoleId: sourceRole.id }),
          }
        );

        return { req, params: { id: String(targetRole.id) } };
      },
      expectStatus: 200,
      verify: async () => {
        const cloned = await prisma.rolePermission.findUnique({
          where: {
            roleId_moduleId: {
              roleId: targetRoleId,
              moduleId,
            },
          },
        });
        expect(cloned?.create).toBe(true);
        expect(cloned?.read).toBe(true);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let roleSlug = "";

    return {
      name: "update role changes fields",
      method: "PATCH",
      route: "/api/roles/update/[slug]",
      handler: updateRole,
      build: async () => {
        const { token } = await seedRoleWithPermission("roles");
        const role = await prisma.role.create({
          data: { name: `Role-${randomUUID()}`, description: "Old" },
        });
        roleSlug = role.slug;

        const req = new NextRequest(
          `http://localhost/api/roles/update/${role.slug}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ name: "Updated Role", description: "New" }),
          }
        );

        return { req, params: { slug: role.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.role.findUnique({
          where: { slug: roleSlug },
          select: { name: true, description: true },
        });
        expect(updated?.name).toBe("Updated Role");
        expect(updated?.description).toBe("New");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let moduleName = "";
    let roleId = 0;

    return {
      name: "add permission module creates role permissions",
      method: "POST",
      route: "/api/permissions/add",
      handler: addPermissionModule,
      build: async () => {
        const { token, role } = await seedRoleWithPermission("permissions");
        roleId = role.id;
        moduleName = `perm-${randomUUID()}`;

        const req = new NextRequest("http://localhost/api/permissions/add", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({
            name: moduleName,
            label: "Permission Module",
          }),
        });

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const module = await prisma.permissionModule.findUnique({
          where: { name: moduleName },
        });
        expect(module).not.toBeNull();

        const permission = await prisma.rolePermission.findUnique({
          where: {
            roleId_moduleId: {
              roleId,
              moduleId: module!.id,
            },
          },
        });
        expect(permission).not.toBeNull();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let moduleName = "";

    return {
      name: "list permission modules includes created module",
      method: "GET",
      route: "/api/permissions/lists",
      handler: listPermissionModules,
      build: async () => {
        const { token } = await seedRoleWithPermission("permissions");
        moduleName = `perm-${randomUUID()}`;
        await prisma.permissionModule.create({
          data: {
            name: moduleName,
            label: "Perm Label",
            description: "Perm description",
          },
        });

        const req = new NextRequest("http://localhost/api/permissions/lists", {
          headers: {
            "x-ui-request": "true",
            cookie: `session=${token}`,
          },
        });

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const names = (body.modules || []).map((m: { name: string }) => m.name);
        expect(names).toContain(moduleName);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let folderSlug = "";

    return {
      name: "get folder by slug returns folder",
      method: "GET",
      route: "/api/spaces/folders/[slug]",
      handler: getFolderBySlug,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        folderSlug = folder.slug;

        const req = new NextRequest(
          `http://localhost/api/spaces/folders/${folder.slug}`,
          { headers: { cookie: `session=${token}` } }
        );

        return { req, params: { slug: folder.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.data?.slug).toBe(folderSlug);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let folderId = 0;

    return {
      name: "add folder creates space",
      method: "POST",
      route: "/api/spaces/folders/add",
      handler: addFolder,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);

        const req = new NextRequest("http://localhost/api/spaces/folders/add", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({ name: "Reports", bucketId: bucket.id }),
        });

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const folder = await prisma.space.findFirst({
          where: { name: "Reports" },
        });
        folderId = folder?.id ?? 0;
        expect(folderId).toBeGreaterThan(0);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let folderId = 0;

    return {
      name: "delete folder marks remove",
      method: "POST",
      route: "/api/spaces/folders/delete",
      handler: deleteFolder,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        folderId = folder.id;

        const root = await ensureStorageRoot();
        await fs.mkdir(path.join(root, bucket.name, folder.name), {
          recursive: true,
        });

        const req = new NextRequest(
          "http://localhost/api/spaces/folders/delete",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ folderId }),
          }
        );

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.space.findUnique({
          where: { id: folderId },
          select: { isAvailable: true },
        });
        expect(updated?.isAvailable).toBe("REMOVE");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let folderSlug = "";

    return {
      name: "list folders returns user folders",
      method: "GET",
      route: "/api/spaces/folders/lists",
      handler: listFolders,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        folderSlug = folder.slug;

        const req = new NextRequest("http://localhost/api/spaces/folders/lists", {
          headers: {
            "x-ui-request": "true",
            cookie: `session=${token}`,
          },
        });

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const slugs = (body.data || []).map((f: { slug: string }) => f.slug);
        expect(slugs).toContain(folderSlug);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let folderId = 0;
    let newParentId = 0;

    return {
      name: "move folder updates parent",
      method: "POST",
      route: "/api/spaces/folders/move",
      handler: moveFolder,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        const target = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Target-${randomUUID()}`,
        });
        folderId = folder.id;
        newParentId = target.id;

        const req = new NextRequest(
          "http://localhost/api/spaces/folders/move",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ folderId, newParentId }),
          }
        );

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.space.findUnique({
          where: { id: folderId },
          select: { parentId: true },
        });
        expect(updated?.parentId).toBe(newParentId);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let folderSlug = "";

    return {
      name: "folder properties returns stats",
      method: "GET",
      route: "/api/spaces/folders/properties",
      handler: folderProperties,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        folderSlug = folder.slug;

        const req = new NextRequest(
          `http://localhost/api/spaces/folders/properties?slug=${folder.slug}`,
          { headers: { cookie: `session=${token}` } }
        );

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.folder?.slug).toBe(folderSlug);
        expect(body.stats?.folderCount).toBeGreaterThanOrEqual(1);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let folderId = 0;
    let newName = "";

    return {
      name: "rename folder updates name and filesystem",
      method: "POST",
      route: "/api/spaces/folders/rename",
      handler: renameFolder,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        const bucket = await createBucket(admin.id);
        const folder = await createSpace({
          bucketId: bucket.id,
          userId: admin.id,
          name: `Folder-${randomUUID()}`,
        });
        folderId = folder.id;
        newName = `Renamed-${randomUUID()}`;

        const root = await ensureStorageRoot();
        await fs.mkdir(path.join(root, bucket.name, folder.name), {
          recursive: true,
        });

        const req = new NextRequest(
          "http://localhost/api/spaces/folders/rename",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ folderId, name: newName }),
          }
        );

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.space.findUnique({
          where: { id: folderId },
          select: { name: true },
        });
        expect(updated?.name).toBe(newName);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let userSlug = "";

    return {
      name: "get user returns user details",
      method: "GET",
      route: "/api/users/[slug]",
      handler: getUser,
      build: async () => {
        const { admin, token } = await seedAuthRole();
        userSlug = admin.slug;

        const req = new NextRequest(
          `http://localhost/api/users/${admin.slug}`,
          {
            headers: {
              "x-ui-request": "true",
              cookie: `session=${token}`,
            },
          }
        );

        return { req, params: { slug: admin.slug } };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.data?.slug).toBe(userSlug);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let email = "";

    return {
      name: "add user creates record",
      method: "POST",
      route: "/api/users/add",
      handler: addUser,
      build: async () => {
        const { token } = await seedAuthRole();
        email = `user-${randomUUID()}@test.local`;

        const req = new NextRequest("http://localhost/api/users/add", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: `session=${token}`,
          },
          body: JSON.stringify({
            name: "New User",
            email,
            password: "password123",
          }),
        });

        return { req };
      },
      expectStatus: 200,
      verify: async () => {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        expect(user).not.toBeNull();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let userSlug = "";
    let roleId = 0;

    return {
      name: "assign role updates user role",
      method: "PATCH",
      route: "/api/users/assign-role/[slug]/role",
      handler: assignUserRole,
      build: async () => {
        const { token } = await seedAuthRole();
        const targetRole = await prisma.role.create({
          data: { name: `Role-${randomUUID()}` },
        });
        roleId = targetRole.id;

        const user = await prisma.user.create({
          data: {
            name: "Role User",
            email: `role-${randomUUID()}@test.local`,
            password: "test-password",
            profilePicture: "",
          },
        });
        userSlug = user.slug;

        const req = new NextRequest(
          `http://localhost/api/users/assign-role/${user.slug}/role`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ roleId }),
          }
        );

        return { req, params: { slug: user.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.user.findUnique({
          where: { slug: userSlug },
          select: { roleId: true },
        });
        expect(updated?.roleId).toBe(roleId);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let userEmail = "";

    return {
      name: "list users includes created user",
      method: "GET",
      route: "/api/users/lists",
      handler: listUsers,
      build: async () => {
        const { token } = await seedAuthRole();
        userEmail = `list-${randomUUID()}@test.local`;
        await prisma.user.create({
          data: {
            name: "List User",
            email: userEmail,
            password: "test-password",
            profilePicture: "",
          },
        });

        const req = new NextRequest("http://localhost/api/users/lists", {
          headers: {
            "x-ui-request": "true",
            cookie: `session=${token}`,
          },
        });

        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        const emails = (body.data || []).map((u: { email: string }) => u.email);
        expect(emails).toContain(userEmail);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let userSlug = "";

    return {
      name: "reset password updates hash",
      method: "PATCH",
      route: "/api/users/reset-password/[slug]/reset",
      handler: resetUserPassword,
      build: async () => {
        const { token } = await seedAuthRole();
        const user = await prisma.user.create({
          data: {
            name: "Reset User",
            email: `reset-${randomUUID()}@test.local`,
            password: "old-password",
            profilePicture: "",
          },
        });
        userSlug = user.slug;

        const req = new NextRequest(
          `http://localhost/api/users/reset-password/${user.slug}/reset`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ newPassword: "new-password" }),
          }
        );

        return { req, params: { slug: user.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.user.findUnique({
          where: { slug: userSlug },
          select: { password: true },
        });
        expect(updated?.password).not.toBe("old-password");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let userSlug = "";

    return {
      name: "status toggles isActive",
      method: "PATCH",
      route: "/api/users/status/[slug]",
      handler: updateUserStatus,
      build: async () => {
        const { token } = await seedAuthRole();
        const user = await prisma.user.create({
          data: {
            name: "Status User",
            email: `status-${randomUUID()}@test.local`,
            password: "test-password",
            profilePicture: "",
            isActive: true,
          },
        });
        userSlug = user.slug;

        const req = new NextRequest(
          `http://localhost/api/users/status/${user.slug}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({ isActive: false }),
          }
        );

        return { req, params: { slug: user.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.user.findUnique({
          where: { slug: userSlug },
          select: { isActive: true },
        });
        expect(updated?.isActive).toBe(false);
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let userSlug = "";

    return {
      name: "update user changes profile fields",
      method: "PATCH",
      route: "/api/users/update/[slug]",
      handler: updateUser,
      build: async () => {
        const { token } = await seedAuthRole();
        const user = await prisma.user.create({
          data: {
            name: "Update User",
            email: `update-${randomUUID()}@test.local`,
            password: "test-password",
            profilePicture: "",
          },
        });
        userSlug = user.slug;

        const req = new NextRequest(
          `http://localhost/api/users/update/${user.slug}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              cookie: `session=${token}`,
            },
            body: JSON.stringify({
              name: "Updated User",
              gender: "male",
              phoneNumber: "123456",
            }),
          }
        );

        return { req, params: { slug: user.slug } };
      },
      expectStatus: 200,
      verify: async () => {
        const updated = await prisma.user.findUnique({
          where: { slug: userSlug },
          select: { name: true, phoneNumber: true, gender: true },
        });
        expect(updated?.name).toBe("Updated User");
        expect(updated?.phoneNumber).toBe("123456");
        expect(updated?.gender).toBe("MALE");
      },
    } satisfies ApiCase;
  })(),
  (() => {
    return {
      name: "docs json returns swagger spec for authenticated user",
      method: "GET",
      route: "/api/docs/json",
      handler: getDocsJson,
      build: async () => {
        const { token } = await seedAuthRole();
        const req = new NextRequest("http://localhost/api/docs/json", {
          headers: { cookie: `session=${token}` },
        });
        return { req };
      },
      expectStatus: 200,
      verify: async (res) => {
        const body = await res.json();
        expect(body.openapi).toBe("3.0.0");
        expect(body.info?.title).toBeTruthy();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    let bucketName = "";

    return {
      name: "multiple upload stores media and bucket",
      method: "POST",
      route: "/api/multiple-upload/upload",
      handler: multiUpload,
      build: async () => {
        const { admin, token } = await seedRoleWithPermission("media-library");
        bucketName = `uploads-${randomUUID()}`;
        await ensureStorageRoot();

        const { body, boundary } = buildMultipartBody({
          fields: {
            bucket: bucketName,
          },
          files: [
            {
              name: "files",
              filename: "multi.txt",
              contentType: "text/plain",
              content: "multi upload",
            },
          ],
        });

        const req = new NextRequest(
          "http://localhost/api/multiple-upload/upload",
          {
            method: "POST",
            headers: {
              "content-type": `multipart/form-data; boundary=${boundary}`,
              cookie: `session=${token}`,
            },
            body,
          }
        );

        return { req };
      },
      expectStatus: 201,
      verify: async () => {
        const bucket = await prisma.bucket.findUnique({
          where: { name: bucketName },
        });
        expect(bucket).not.toBeNull();
        const media = await prisma.media.findFirst({
          where: { bucketId: bucket?.id },
        });
        expect(media).not.toBeNull();
      },
    } satisfies ApiCase;
  })(),
  (() => {
    return {
      name: "external create-folder (todo)",
      method: "POST",
      route: "/api/external/create-folder",
      todo: true,
    } satisfies ApiCase;
  })(),
];
