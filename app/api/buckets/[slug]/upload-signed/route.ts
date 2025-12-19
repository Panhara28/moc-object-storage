import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { verifyPayload } from "@/lib/signedUrl";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import path from "path";

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const extension = file.name.split(".").pop() || "";
    const storedFilename = `${randomUUID()}.${extension}`;
    const folderPath = payload.path ?? "";

    const STORAGE_ROOT = getStorageRoot();
    const storedPath = folderPath
      ? path.join(STORAGE_ROOT, bucket.name, folderPath, storedFilename)
      : path.join(STORAGE_ROOT, bucket.name, storedFilename);

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
