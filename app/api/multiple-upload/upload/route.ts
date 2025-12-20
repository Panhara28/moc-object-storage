/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize, getAuthUser } from "@/lib/authorized";
import { validateUploadFile } from "@/lib/upload-validation";
import { randomUUID, randomBytes } from "crypto";
import * as fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const MAX_UPLOAD_BYTES =
  Number(process.env.MAX_UPLOAD_BYTES) || 50 * 1024 * 1024; // 50MB default
const ALLOWED_MIME_PREFIXES = ["image/", "video/", "audio/"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
];

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function generateAccessKeyId() {
  return "AKIA-" + randomBytes(8).toString("hex").toUpperCase();
}

function generateSecretAccessKey() {
  return randomBytes(32).toString("base64");
}

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;

  if (process.platform === "darwin") {
    return path.join(process.cwd(), "storage");
  }

  if (process.platform === "linux") {
    return "/mnt/storage";
  }

  if (process.platform === "win32") {
    return path.join(process.cwd(), "storage");
  }

  return path.join(process.cwd(), "storage");
}

function isSafeSegment(segment: string) {
  return (
    segment.length > 0 &&
    !segment.includes("..") &&
    !segment.includes("/") &&
    !segment.includes("\\") &&
    !segment.includes(":") &&
    !segment.includes("\0")
  );
}

function assertPathInsideBase(base: string, target: string) {
  const baseResolved = path.resolve(base);
  const targetResolved = path.resolve(target);
  if (
    targetResolved !== baseResolved &&
    !targetResolved.startsWith(baseResolved + path.sep)
  ) {
    throw new Error("Resolved path escapes storage root");
  }
}

// ===============================================================
// Detect file type
// ===============================================================
function detectMediaType(mime: string, extension: string) {
  if (mime.startsWith("image")) return "IMAGE";
  if (mime.startsWith("video")) return "VIDEO";
  if (mime.startsWith("audio")) return "AUDIO";
  if (extension.toLowerCase() === "pdf") return "PDF";

  const docExt = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"];
  if (docExt.includes(extension.toLowerCase())) return "DOCUMENT";

  return "OTHER";
}

// ===============================================================
// MAIN UPLOAD HANDLER
// ===============================================================
export async function POST(req: NextRequest) {
  try {
    // 1. AUTHORIZATION
    const auth = await authorize(req, "media-library", "create");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. READ FORM DATA
    const form = await req.formData();
    const files = form.getAll("files") as File[];

    const rawBucketName = (form.get("bucket") as string) || "uploads";
    const bucketName = rawBucketName.trim();
    const folderSlug = form.get("folderSlug") as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No files uploaded" },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (file.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json(
          {
            status: "error",
            message: `File "${file.name}" exceeds size limit of ${MAX_UPLOAD_BYTES} bytes.`,
          },
          { status: 400 }
        );
      }
    }

    if (!isSafeSegment(bucketName)) {
      return NextResponse.json(
        { status: "error", message: "Invalid bucket name." },
        { status: 400 }
      );
    }

    // ===============================================================
    // 3. STORAGE ROOT (WINDOWS or LINUX)
    // ===============================================================
    const STORAGE_ROOT = getStorageRoot();

    // ===============================================================
    // 4. RESOLVE OR CREATE BUCKET
    // ===============================================================
    let bucket = await prisma.bucket.findUnique({
      where: { name: bucketName },
    });

    if (bucket && bucket.isAvailable !== "AVAILABLE") {
      return NextResponse.json(
        { status: "error", message: "Bucket is not available for uploads." },
        { status: 403 }
      );
    }

    if (!bucket) {
      const accessKeyName = `${bucketName}-key`;
      const accessKeyId = generateAccessKeyId();
      const secretAccessKey = generateSecretAccessKey();

      bucket = await prisma.bucket.create({
        data: {
          name: bucketName,
          accessKeyName,
          accessKeyId,
          secretAccessKey,
          permission: "FULL_ACCESS",
          createdById: user.id,
        },
      });
    }

    if (!isSafeSegment(bucket.name)) {
      return NextResponse.json(
        { status: "error", message: "Invalid bucket name." },
        { status: 400 }
      );
    }

    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);
    await fs.mkdir(bucketDir, { recursive: true });

    // ===============================================================
    // 5. RESOLVE FOLDER (SPACE)
    // ===============================================================
    let space = null;
    let folderPath = ""; // default no folder

    if (folderSlug) {
      space = await prisma.space.findUnique({
        where: { slug: folderSlug },
        select: { id: true, name: true, bucketId: true },
      });

      if (!space) {
        return NextResponse.json(
          { status: "error", message: "Folder not found" },
          { status: 404 }
        );
      }

      if (space.bucketId !== bucket.id) {
        return NextResponse.json(
          { status: "error", message: "Folder belongs to another bucket" },
          { status: 400 }
        );
      }

      if (!isSafeSegment(space.name)) {
        return NextResponse.json(
          { status: "error", message: "Invalid folder name." },
          { status: 400 }
        );
      }

      folderPath = space.name;

      const folderDir = path.join(bucketDir, folderPath);
      assertPathInsideBase(bucketDir, folderDir);
      await fs.mkdir(folderDir, { recursive: true });
    }

    const validatedFiles = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const validation = validateUploadFile({
        file,
        buffer,
        allowedMimePrefixes: ALLOWED_MIME_PREFIXES,
        allowedMimeTypes: ALLOWED_MIME_TYPES,
      });
      if (!validation.ok) {
        return NextResponse.json(
          {
            status: "error",
            message: `File "${file.name}" ${validation.reason}`,
          },
          { status: 400 }
        );
      }
      validatedFiles.push({
        file,
        buffer,
        mime: validation.mime,
        ext: validation.ext,
      });
    }

    // ===============================================================
    // 6. CREATE UPLOAD SESSION
    // ===============================================================
    const uploadSession = await prisma.mediaUpload.create({
      data: { userId: user.id },
    });

    const uploads = [];

    // ===============================================================
    // 7. PROCESS EACH FILE
    // ===============================================================
    for (const entry of validatedFiles) {
      const { file, buffer, mime, ext } = entry;
      const extension = ext.toLowerCase();
      const storedFilename = `${randomUUID()}.${extension}`;

      // actual disk path
      const storedPath = folderPath
        ? path.join(bucketDir, folderPath, storedFilename)
        : path.join(bucketDir, storedFilename);
      assertPathInsideBase(bucketDir, storedPath);

      await fs.writeFile(storedPath, buffer);

      // extract dimensions
      let width: number | null = null;
      let height: number | null = null;

      if (mime.startsWith("image/")) {
        try {
          const meta = await sharp(buffer).metadata();
          width = meta.width ?? null;
          height = meta.height ?? null;
        } catch {}
      }

      const type = detectMediaType(mime, extension);

      // ===============================================================
      // 8. CREATE MEDIA RECORD
      // ===============================================================
      const publicBase =
        process.env.STORAGE_PUBLIC_BASE_URL ||
        (process.env.NODE_ENV === "production"
          ? "https://moc-drive.moc.gov.kh"
          : "http://localhost:3000/storage");

      const trimmedBase = publicBase.endsWith("/")
        ? publicBase.slice(0, -1)
        : publicBase;

      const publicUrl = folderPath
        ? `${trimmedBase}/${bucket.name}/${folderPath}/${storedFilename}`
        : `${trimmedBase}/${bucket.name}/${storedFilename}`;

      const media = await prisma.media.create({
        data: {
          filename: file.name,
          storedFilename,
          url: publicUrl,
          fileType: type,
          mimetype: mime,
          extension: extension.toLowerCase(),
          size: file.size,
          width,
          height,
          uploadedById: user.id,

          // ⭐ NEW SCHEMA FIELDS
          bucketId: bucket.id,
          path: folderPath,
        },
      });

      // ===============================================================
      // 9. RECORD MEDIA UPLOAD DETAIL
      // ===============================================================
      if (space) {
        await prisma.mediaUploadDetail.create({
          data: {
            mediaUploadId: uploadSession.id,
            mediaId: media.id,
            spaceId: space.id,
          },
        });
      }

      uploads.push({
        id: media.slug,
        slug: media.slug,
        bucketSlug: bucket.slug,
        bucketName: bucket.name,
        url: media.url,
        filename: media.filename,
        storedFilename: media.storedFilename,
        type: media.fileType,
        width: media.width,
        height: media.height,
      });
    }

    // ===============================================================
    // 10. RESPONSE
    // ===============================================================
    return NextResponse.json(
      {
        status: "ok",
        bucket: bucket.name,
        bucketSlug: bucket.slug,
        folder: folderPath || null,
        uploadSessionId: uploadSession.id,
        uploads,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("❌ Upload Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Upload failed",
      },
      { status: 500 }
    );
  }
}
