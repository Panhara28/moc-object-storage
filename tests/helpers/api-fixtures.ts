import { randomUUID } from "crypto";
import path from "path";
import * as fs from "fs/promises";
import prisma from "@/lib/prisma";

export const STORAGE_ROOT = path.join(process.cwd(), "tmp-test-storage");

export async function ensureStorageRoot() {
  process.env.STORAGE_ROOT = STORAGE_ROOT;
  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  return STORAGE_ROOT;
}

export async function createBucket(createdById: number) {
  const suffix = randomUUID();
  return prisma.bucket.create({
    data: {
      name: `bucket-${suffix}`,
      createdById,
      accessKeyName: `access-${suffix}`,
      accessKeyId: `access-id-${suffix}`,
      secretAccessKey: `secret-${suffix}`,
      permission: "FULL_ACCESS",
      isAvailable: "AVAILABLE",
    },
  });
}

export async function createSpace({
  bucketId,
  userId,
  parentId = null,
  name,
}: {
  bucketId: number;
  userId: number;
  parentId?: number | null;
  name: string;
}) {
  return prisma.space.create({
    data: {
      name,
      parentId,
      bucketId,
      userId,
      isAvailable: "AVAILABLE",
      uploadedAt: new Date(),
      mediaId: null,
    },
  });
}

export async function createMedia({
  bucketId,
  userId,
  pathName = null,
  isAccessible = "PUBLIC",
  storedFilename,
  filename,
  size = 12,
}: {
  bucketId: number;
  userId: number;
  pathName?: string | null;
  isAccessible?: "PUBLIC" | "PRIVATE";
  storedFilename: string;
  filename: string;
  size?: number;
}) {
  return prisma.media.create({
    data: {
      filename,
      storedFilename,
      url: `http://localhost/storage/${storedFilename}`,
      bucketId,
      path: pathName,
      fileType: "DOCUMENT",
      mimetype: "text/plain",
      extension: "txt",
      size,
      uploadedById: userId,
      isVisibility: "AVAILABLE",
      isAccessible,
    },
  });
}

export async function writeBucketFile({
  bucketName,
  folder = "",
  filename,
  content,
}: {
  bucketName: string;
  folder?: string;
  filename: string;
  content: string | Buffer;
}) {
  const root = await ensureStorageRoot();
  const bucketDir = path.join(root, bucketName);
  const targetDir = folder ? path.join(bucketDir, folder) : bucketDir;
  await fs.mkdir(targetDir, { recursive: true });
  const filePath = path.join(targetDir, filename);
  await fs.writeFile(filePath, content);
  return filePath;
}

export function buildMultipartBody({
  fields = {},
  files = [],
}: {
  fields?: Record<string, string>;
  files?: Array<{
    name: string;
    filename: string;
    contentType: string;
    content: Buffer | string;
  }>;
} = {}) {
  const boundary = `----codex-${randomUUID()}`;
  const parts: Array<string | Buffer> = [];

  for (const [name, value] of Object.entries(fields)) {
    parts.push(`--${boundary}\r\n`);
    parts.push(`Content-Disposition: form-data; name="${name}"\r\n\r\n`);
    parts.push(`${value}\r\n`);
  }

  for (const file of files) {
    parts.push(`--${boundary}\r\n`);
    parts.push(
      `Content-Disposition: form-data; name="${file.name}"; filename="${file.filename}"\r\n`
    );
    parts.push(`Content-Type: ${file.contentType}\r\n\r\n`);
    parts.push(
      Buffer.isBuffer(file.content) ? file.content : Buffer.from(file.content)
    );
    parts.push("\r\n");
  }

  parts.push(`--${boundary}--\r\n`);

  const body = Buffer.concat(
    parts.map((part) => (Buffer.isBuffer(part) ? part : Buffer.from(part)))
  );

  return { body, boundary };
}
