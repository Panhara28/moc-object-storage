import { NextRequest } from "next/server";
import { expect } from "vitest";
import prisma from "@/lib/prisma";

export function jsonRequest(
  url: string,
  {
    method = "GET",
    body,
    headers = {},
  }: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  } = {}
) {
  return new NextRequest(url, {
    method,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function withAuth(
  token: string,
  headers: Record<string, string> = {}
) {
  return {
    ...headers,
    cookie: `session=${token}`,
  };
}

export function withUi(headers: Record<string, string> = {}) {
  return {
    ...headers,
    "x-ui-request": "true",
  };
}

export async function expectJson(
  res: Response,
  status: number
): Promise<unknown> {
  expect(res.status).toBe(status);
  const contentType = res.headers.get("content-type") || "";
  expect(contentType).toContain("application/json");
  return res.json();
}

export async function snapshotDbCounts() {
  const [
    users,
    roles,
    rolePermissions,
    permissionModules,
    buckets,
    spaces,
    medias,
    mediaUploads,
    mediaUploadDetails,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.role.count(),
    prisma.rolePermission.count(),
    prisma.permissionModule.count(),
    prisma.bucket.count(),
    prisma.space.count(),
    prisma.media.count(),
    prisma.mediaUpload.count(),
    prisma.mediaUploadDetail.count(),
  ]);

  return {
    users,
    roles,
    rolePermissions,
    permissionModules,
    buckets,
    spaces,
    medias,
    mediaUploads,
    mediaUploadDetails,
  };
}

export function expectNoDbChanges(
  before: Awaited<ReturnType<typeof snapshotDbCounts>>,
  after: Awaited<ReturnType<typeof snapshotDbCounts>>
) {
  expect(after).toEqual(before);
}
