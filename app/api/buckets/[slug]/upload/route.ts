/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize, getAuthUser } from "@/lib/authorized";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  context: { params: { slug: string } }
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
    const bucket = await prisma.bucket.findUnique({
      where: { slug, isAvailable: "AVAILABLE" },
    });

    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    const STORAGE_ROOT = process.env.STORAGE_ROOT || "/mnt/storage";

    // Create bucket storage path if needed
    const bucketDir = path.join(STORAGE_ROOT, bucket.name);
    await fs.mkdir(bucketDir, { recursive: true });

    // ===============================================================
    // 4. RESOLVE FOLDER (SPACE)
    // ===============================================================
    let space = null;
    let folderPath = "";

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

      folderPath = space.name;

      await fs.mkdir(path.join(bucketDir, folderPath), { recursive: true });
    }

    // ===============================================================
    // 5. CREATE UPLOAD SESSION
    // ===============================================================
    const uploadSession = await prisma.mediaUpload.create({
      data: { userId: user.id },
    });

    const uploads = [];

    // ===============================================================
    // 6. PROCESS EACH FILE
    // ===============================================================
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const extension = file.name.split(".").pop() || "";
      const storedFilename = `${randomUUID()}.${extension}`;

      const storedPath = folderPath
        ? path.join(bucketDir, folderPath, storedFilename)
        : path.join(bucketDir, storedFilename);

      await fs.writeFile(storedPath, buffer);

      // Extract image metadata
      let width: number | null = null;
      let height: number | null = null;

      if (file.type.startsWith("image/")) {
        try {
          const meta = await sharp(buffer).metadata();
          width = meta.width ?? null;
          height = meta.height ?? null;
        } catch {}
      }

      const type = detectMediaType(file.type, extension);

      // ===============================================================
      // 7. CREATE MEDIA RECORD
      // ===============================================================
      const publicUrl = folderPath
        ? `https://moc-drive.moc.gov.kh/${bucket.name}/${folderPath}/${storedFilename}`
        : `https://moc-drive.moc.gov.kh/${bucket.name}/${storedFilename}`;

      const media = await prisma.media.create({
        data: {
          filename: file.name,
          storedFilename,
          url: publicUrl,
          fileType: type,
          mimetype: file.type,
          extension: extension.toLowerCase(),
          size: file.size,
          width,
          height,
          uploadedById: user.id,

          bucketId: bucket.id,
          path: folderPath,
        },
      });

      // Save upload details
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
        url: media.url,
        filename: media.filename,
        storedFilename: media.storedFilename,
        type: media.fileType,
        width: media.width,
        height: media.height,
      });
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
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Upload Error:", error);
    return NextResponse.json(
      { status: "error", message: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
