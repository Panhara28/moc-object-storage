// app/api/buckets/[slug]/regenerate-access-key/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize } from "@/lib/authorized";
import crypto from "crypto";

function generateAccessKeyId() {
  return "AKIA-" + crypto.randomBytes(8).toString("hex").toUpperCase();
}

function generateSecretAccessKey() {
  return crypto.randomBytes(32).toString("base64");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    const auth = await authorize(req, "media-library", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }

    const newAccessKeyId = generateAccessKeyId();
    const newSecretAccessKey = generateSecretAccessKey();

    const bucket = await prisma.bucket.update({
      where: { slug },
      data: {
        accessKeyId: newAccessKeyId,
        secretAccessKey: newSecretAccessKey,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "Access key regenerated successfully",
      bucket: {
        slug: bucket.slug,
        accessKeyId: newAccessKeyId,
        secretAccessKey: newSecretAccessKey, // show ONLY once
      },
    });
  } catch (err: any) {
    console.error("Regenerate Key Error:", err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
