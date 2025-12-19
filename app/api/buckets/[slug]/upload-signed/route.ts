import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { verifyPayload } from "@/lib/signedUrl";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import path from "path";

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

function isMimeAllowed(mime: string) {
  return (
    ALLOWED_MIME_PREFIXES.some((p) => mime.startsWith(p)) ||
    ALLOWED_MIME_TYPES.includes(mime)
  );
}

function getStorageRoot() {
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;
  if (process.platform === "darwin") return path.join(process.cwd(), "storage");
  if (process.platform === "linux") return "/mnt/storage";
  if (process.platform === "win32") return path.join(process.cwd(), "storage");
  return path.join(process.cwd(), "storage");
}

function detectMediaType(mime: string, extension: string) {
  if (mime.startsWith("image")) return "IMAGE";
  if (mime.startsWith("video")) return "VIDEO";
  if (mime.startsWith("audio")) return "AUDIO";
  if (extension.toLowerCase() === "pdf") return "PDF";
  const docExt = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"];
  if (docExt.includes(extension.toLowerCase())) return "DOCUMENT";
  return "OTHER";
}

function normalizePath(input?: string | null) {
  if (!input) return null;
  const trimmed = input.replace(/\\/g, "/").trim();
  const stripped = trimmed.replace(/^\/+|\/+$/g, "");
  if (!stripped) return null;
  if (stripped.includes("\0")) return null;
  const segments = stripped.split("/");
  for (const seg of segments) {
    if (!seg || seg === "." || seg === "..") return null;
    if (seg.includes("..") || seg.includes(":")) return null;
  }
  return segments.join("/");
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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const token = req.nextUrl.searchParams.get("token") || req.headers.get("x-upload-token");

    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Missing upload token." },
        { status: 400 }
      );
    }

    const payload = verifyPayload(token);
    if (!payload || payload.action !== "upload") {
      return NextResponse.json(
        { status: "error", message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    if (!payload.userId) {
      return NextResponse.json(
        { status: "error", message: "Upload token missing user context." },
        { status: 400 }
      );
    }

    const bucket = await prisma.bucket.findUnique({
      where: { slug, isAvailable: "AVAILABLE" },
      select: { id: true, name: true },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found or unavailable." },
        { status: 404 }
      );
    }

    if (payload.bucket !== bucket.name) {
      return NextResponse.json(
        { status: "error", message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { status: "error", message: "No file uploaded." },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        {
          status: "error",
          message: `File "${file.name}" exceeds size limit of ${MAX_UPLOAD_BYTES} bytes.`,
        },
        { status: 400 }
      );
    }

    if (!file.type || !isMimeAllowed(file.type)) {
      return NextResponse.json(
        {
          status: "error",
          message: `File "${file.name}" has an unsupported type ${file.type || "(unknown)"}.`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const extension = file.name.split(".").pop() || "";
    const storedFilename = `${randomUUID()}.${extension}`;
    const rawPath = typeof payload.path === "string" ? payload.path : null;
    const normalizedPath = normalizePath(rawPath);
    if (rawPath && !normalizedPath) {
      return NextResponse.json(
        { status: "error", message: "Invalid path in token." },
        { status: 400 }
      );
    }
    const folderPath = normalizedPath ?? "";

    const STORAGE_ROOT = getStorageRoot();
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    assertPathInsideBase(STORAGE_ROOT, bucketDir);
    const storedPath = folderPath
      ? path.join(bucketDir, folderPath, storedFilename)
      : path.join(bucketDir, storedFilename);
    assertPathInsideBase(bucketDir, storedPath);

    await fs.mkdir(path.dirname(storedPath), { recursive: true });
    await fs.writeFile(storedPath, buffer);

    const type = detectMediaType(file.type, extension);

    const media = await prisma.media.create({
      data: {
        filename: payload.filename || file.name,
        storedFilename,
        url: folderPath
          ? `https://moc-drive.moc.gov.kh/${bucket.name}/${folderPath}/${storedFilename}`
          : `https://moc-drive.moc.gov.kh/${bucket.name}/${storedFilename}`,
        fileType: type,
        mimetype: file.type,
        extension: extension.toLowerCase(),
        size: file.size,
        uploadedById: payload.userId,
        bucketId: bucket.id,
        path: folderPath || null,
      },
      select: {
        slug: true,
        filename: true,
        storedFilename: true,
        url: true,
        fileType: true,
        size: true,
        path: true,
      },
    });

    return NextResponse.json(
      {
        status: "ok",
        media,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signed upload error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Signed upload failed.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
