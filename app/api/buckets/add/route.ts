/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize, getAuthUser } from "@/lib/authorized";
import * as crypto from "crypto";
import * as fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */
function generateAccessKeyId() {
  return "AKIA-" + crypto.randomBytes(8).toString("hex").toUpperCase();
}

function generateSecretAccessKey() {
  return crypto.randomBytes(32).toString("base64");
}

/**
 * Get a valid storage root for macOS, Windows, Linux
 */
function getStorageRoot() {
  // If user sets a custom storage folder, always prefer it.
  if (process.env.STORAGE_ROOT) return process.env.STORAGE_ROOT;

  // macOS (darwin)
  if (process.platform === "darwin") {
    // Use local ./storage folder inside the project
    return path.join(process.cwd(), "storage");
  }

  // Linux servers
  if (process.platform === "linux") {
    return "/mnt/storage";
  }

  // Windows
  if (process.platform === "win32") {
    return path.join(process.cwd(), "storage");
  }

  // Fallback (rare cases)
  return path.join(process.cwd(), "storage");
}

/* -------------------------------------------------------
   CREATE BUCKET
------------------------------------------------------- */
export async function POST(req: NextRequest) {
  try {
    // 🛡 Authorization
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

    // 📥 Payload
    const body = await req.json();
    const name = body.name?.trim();
    const permission = body.permission || "FULL_ACCESS";

    if (!name) {
      return NextResponse.json(
        { status: "error", message: "Bucket name is required." },
        { status: 400 }
      );
    }

    const safeName = name.toLowerCase().replace(/[^a-z0-9-_]/g, "-");

    // Duplicate check
    const exists = await prisma.bucket.findUnique({
      where: { name: safeName },
    });

    if (exists) {
      return NextResponse.json(
        { status: "error", message: "Bucket already exists." },
        { status: 409 }
      );
    }

    // 🔑 Generate credentials
    const accessKeyName = `${safeName}-key`;
    const accessKeyId = generateAccessKeyId();
    const secretAccessKey = generateSecretAccessKey();

    // 🗄  Save bucket
    const bucket = await prisma.bucket.create({
      data: {
        name: safeName,
        accessKeyName,
        accessKeyId,
        secretAccessKey,
        permission,
        createdById: user.id,
      },
    });

    /* -------------------------------------------------------
       FILE SYSTEM — CROSS PLATFORM FIX
    ------------------------------------------------------- */
    const STORAGE_ROOT = getStorageRoot();
    const bucketDir = path.join(STORAGE_ROOT, safeName);

    // Ensure base storage folder exists
    await fs.mkdir(STORAGE_ROOT, { recursive: true });

    // Ensure bucket folder exists
    await fs.mkdir(bucketDir, { recursive: true });

    /* -------------------------------------------------------
       RESPONSE
    ------------------------------------------------------- */
    return NextResponse.json(
      {
        status: "ok",
        message: "Bucket created successfully.",
        bucket: {
          id: bucket.id,
          name: bucket.name,
          slug: bucket.slug,
          accessKeyId,
          secretAccessKey, // Returned once only
          permission: bucket.permission,
        },
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Bucket Create Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create bucket",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
