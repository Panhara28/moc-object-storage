import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getApiAuthentication } from "@/lib/api-auth";
import { validateUploadFile } from "@/lib/upload-validation";
import { queueVirusTotalScanForMedia } from "@/lib/virustotal";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";
import { randomUUID } from "crypto";
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

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin") return path.join(process.cwd(), "storage");
  if (process.platform === "linux") return "/mnt/storage";
  if (process.platform === "win32") return path.join(process.cwd(), "storage");
  return path.join(process.cwd(), "storage");
}

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

function detectMediaType(mime: string, extension: string) {
  if (mime.startsWith("image/")) return "IMAGE";
  if (mime.startsWith("video/")) return "VIDEO";
  if (mime.startsWith("audio/")) return "AUDIO";
  if (extension.toLowerCase() === "pdf") return "PDF";
  const docExt = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"];
  if (docExt.includes(extension.toLowerCase())) return "DOCUMENT";
  return "OTHER";
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getApiAuthentication(req);
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const key = auth.key;
    const bucket = await prisma.bucket.findUnique({
      where: { id: key.bucketId },
      select: { id: true, name: true, createdById: true, slug: true },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    const form = await req.formData();
    const files = form.getAll("files") as File[];
    const folderSlug = form.get("folderSlug") as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No files uploaded" },
        { status: 400 }
      );
    }

    const STORAGE_ROOT = getStorageRoot();
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);
    await fs.mkdir(bucketDir, { recursive: true });

    let folderPath = "";
    let space = null;

    if (folderSlug) {
      space = await prisma.space.findUnique({
        where: { slug: folderSlug },
        select: { id: true, name: true, bucketId: true },
      });

      if (!space || space.bucketId !== bucket.id) {
        return NextResponse.json(
          { status: "error", message: "Folder not found" },
          { status: 404 }
        );
      }

      if (!isSafeSegment(space.name)) {
        return NextResponse.json(
          { status: "error", message: "Invalid folder name." },
          { status: 400 }
        );
      }

      folderPath = space.name;
      const folderFullPath = path.join(bucketDir, folderPath);
      assertPathInsideBase(bucketDir, folderFullPath);
      await fs.mkdir(folderFullPath, { recursive: true });
    }

    const uploadSession = await prisma.mediaUpload.create({
      data: { userId: bucket.createdById },
    });

    const uploads = [];
    const failures: { filename: string; reason: string }[] = [];

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

        let width: number | undefined;
        let height: number | undefined;
        if (validation.mime.startsWith("image/")) {
          try {
            const meta = await sharp(buffer).metadata();
            width = meta.width ?? undefined;
            height = meta.height ?? undefined;
          } catch {}
        }

        const type = detectMediaType(validation.mime, extension);
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
            uploadedById: bucket.createdById,
            bucketId: bucket.id,
            path: folderPath,
            isVisibility: "DRAFTED",
            isAccessible: "RESTRICTED",
            scanStatus: "PENDING",
          },
        });

        await prisma.mediaUploadDetail.create({
          data: {
            mediaUploadId: uploadSession.id,
            mediaId: media.id,
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
          ...getAuditRequestInfo(req),
          actorId: bucket.createdById,
          action: "external.media.upload",
          resourceType: "Media",
          resourceId: media.id,
          status: 201,
          metadata: {
            bucketId: bucket.id,
            bucketSlug: bucket.slug,
            filename: file.name,
            path: folderPath || null,
            accessKeyId: key.accessKeyId,
          },
        });

        queueVirusTotalScanForMedia({
          mediaId: media.id,
          filename: file.name,
          buffer,
          storedPath,
        });
      } catch (error) {
        console.error("External upload failed for file:", file.name, error);
        await fs.rm(storedPath, { force: true }).catch(() => {});
        failures.push({
          filename: file.name,
          reason: "Upload failed. Please try again.",
        });
      }
    }

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
  } catch (error) {
    console.error("External upload error:", error);
    return NextResponse.json(
      { status: "error", message: "Upload failed" },
      { status: 500 }
    );
  }
}
