/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize, getAuthUser } from "@/lib/authorized";
import { validateUploadFile } from "@/lib/upload-validation";
import { queueVirusTotalScanForMedia } from "@/lib/virustotal";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

function isSafeSegment(segment: string) {
  return (
    segment.length > 0 &&
    !segment.includes("..") &&
    !segment.includes("/") &&
    !segment.includes("\\")
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
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

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
    const auditInfo = getAuditRequestInfo(req);

    // 2. READ FORM DATA
    const form = await req.formData();
    const files = form.getAll("files") as File[];
    const folderSlug = form.get("folderSlug") as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No files uploaded" },
        { status: 400 }
      );
    }

    // ===============================================================
    // 3. GET BUCKET USING SLUG
    // ===============================================================
    const bucket = await prisma.bucket.findFirst({
      where: { slug, isAvailable: "AVAILABLE", createdById: user.id },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    if (!isSafeSegment(bucket.name)) {
      return NextResponse.json(
        { status: "error", message: "Invalid bucket name." },
        { status: 400 }
      );
    }

    const STORAGE_ROOT = process.env.STORAGE_ROOT || "/mnt/storage";
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);
    await fs.mkdir(bucketDir, { recursive: true });

    // ===============================================================
    // 4. RESOLVE FOLDER (SPACE) AND CHECK FILESYSTEM FOLDER
    // ===============================================================
    let folderPath = "";
    let space = null; // Declare space outside the if block so it can be used later

    if (folderSlug) {
      space = await prisma.space.findUnique({
        where: { slug: folderSlug },
        select: { id: true, name: true, bucketId: true },
      });

      if (space && space.bucketId !== bucket.id) {
        return NextResponse.json(
          { status: "error", message: "Folder belongs to another bucket" },
          { status: 400 }
        );
      }

      // If the folder isn't found, gracefully fall back to bucket root
      if (space) {
        if (!isSafeSegment(space.name)) {
          return NextResponse.json(
            { status: "error", message: "Invalid folder name." },
            { status: 400 }
          );
        }
        folderPath = space.name;
      }

      // ===============================================================
      // Create folder on filesystem only if it doesn't exist
      // ===============================================================
      if (folderPath) {
        const folderFullPath = path.join(bucketDir, folderPath);
        assertPathInsideBase(bucketDir, folderFullPath);

        try {
          await fs.mkdir(folderFullPath, { recursive: true }); // Create folder if it doesn't exist
        } catch (error) {
          console.error("Error creating folder on filesystem:", error);
          return NextResponse.json(
            { status: "error", message: "Error creating folder on filesystem" },
            { status: 500 }
          );
        }
      }
    }

    // ===============================================================
    // 5. CREATE UPLOAD SESSION
    // ===============================================================
    const uploadSession = await prisma.mediaUpload.create({
      data: { userId: user.id },
    });

    const uploads = [];
    const failures: { filename: string; reason: string }[] = [];

    // ===============================================================
    // 6. PROCESS EACH FILE
    // ===============================================================
    for (const file of files) {
      if (file.size > MAX_UPLOAD_BYTES) {
        failures.push({
          filename: file.name,
          reason: `File exceeds size limit of ${MAX_UPLOAD_BYTES} bytes.`,
        });
        continue;
      }

      let buffer: Buffer;
      try {
        buffer = Buffer.from(await file.arrayBuffer());
      } catch (error) {
        console.error("Failed to read upload buffer:", error);
        failures.push({
          filename: file.name,
          reason: "Failed to read file data.",
        });
        continue;
      }

      const validation = validateUploadFile({
        file,
        buffer,
        allowedMimePrefixes: ALLOWED_MIME_PREFIXES,
        allowedMimeTypes: ALLOWED_MIME_TYPES,
      });
      if (!validation.ok) {
        failures.push({
          filename: file.name,
          reason: validation.reason,
        });
        continue;
      }

      const extension = validation.ext.toLowerCase();
      const storedFilename = `${randomUUID()}.${extension}`;
      const storedPath = folderPath
        ? path.join(bucketDir, folderPath, storedFilename)
        : path.join(bucketDir, storedFilename);
      assertPathInsideBase(bucketDir, storedPath);

      try {
        await fs.writeFile(storedPath, buffer);

        // Extract image metadata (if it's an image)
        let width: number | undefined = undefined;
        let height: number | undefined = undefined;

        if (validation.mime.startsWith("image/")) {
          try {
            const meta = await sharp(buffer).metadata();
            width = meta.width ?? undefined;
            height = meta.height ?? undefined;
          } catch {}
        }

        const type = detectMediaType(validation.mime, extension);

        // ===============================================================
        // CREATE MEDIA RECORD
        // ===============================================================
        const publicBaseUrl =
          process.env.STORAGE_PUBLIC_BASE_URL ||
          (process.env.NODE_ENV === "production"
            ? "https://moc-drive.moc.gov.kh"
            : "http://localhost:3000/storage");

        const mediaPath = folderPath
          ? `${bucket.name}/${folderPath}/${storedFilename}`
          : `${bucket.name}/${storedFilename}`;

        const trimmedBase = publicBaseUrl.endsWith("/")
          ? publicBaseUrl.slice(0, -1)
          : publicBaseUrl;

        const publicUrl = `${trimmedBase}/${mediaPath}`;

        const media = await prisma.media.create({
          data: {
            filename: file.name,
            storedFilename,
            url: publicUrl,
            fileType: type,
            mimetype: validation.mime,
            extension: extension.toLowerCase(),
            size: file.size,
            width,
            height,
            uploadedById: user.id,
            bucketId: bucket.id,
            path: folderPath,
            isVisibility: "DRAFTED",
            isAccessible: "RESTRICTED",
            scanStatus: "PENDING",
          },
        });

        // Save upload details (Always create the upload detail)
        await prisma.mediaUploadDetail.create({
          data: {
            mediaUploadId: uploadSession.id,
            mediaId: media.id,
            // Pass null for spaceId if no folderSlug is provided
            spaceId: folderSlug ? (space ? space.id : null) : null,
          },
        });

        uploads.push({
          id: media.slug,
          slug: media.slug,
          url: media.url,
          filename: media.filename,
          storedFilename: media.storedFilename,
          type: media.fileType,
          width: media.width,
          height: media.height,
          scanStatus: media.scanStatus,
        });

        await logAudit({
          ...auditInfo,
          actorId: user.id,
          action: "media.upload",
          resourceType: "Media",
          resourceId: media.id,
          status: 201,
          metadata: {
            bucketId: bucket.id,
            bucketSlug: bucket.slug,
            filename: file.name,
            path: folderPath || null,
          },
        });

        queueVirusTotalScanForMedia({
          mediaId: media.id,
          filename: file.name,
          buffer,
          storedPath,
        });

      } catch (error) {
        console.error("Upload failed for file:", file.name, error);
        await fs.rm(storedPath, { force: true }).catch(() => {});
        failures.push({
          filename: file.name,
          reason: "Upload failed. Please try again.",
        });
      }
    }

    // ===============================================================
    // 8. RESPONSE
    // ===============================================================
    return NextResponse.json(
      {
        status: "ok",
        bucket: bucket.name,
        folder: folderPath || null,
        uploadSessionId: uploadSession.id,
        uploads,
        failures,
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
