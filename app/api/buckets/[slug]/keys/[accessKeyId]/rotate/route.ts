import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";
import { generateSecretAccessKey } from "@/lib/key-utils";
import { encryptSecret } from "@/lib/secret-encryption";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string; accessKeyId: string }> }
) {
  try {
    const { slug, accessKeyId } = await context.params;
    const auth = await authorize(req, "buckets", "update");
    if (!auth.ok) {
      return NextResponse.json(
        { status: "error", message: auth.message },
        { status: auth.status }
      );
    }
    const user = auth.user;
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const bucket = await prisma.bucket.findFirst({
      where: { slug, createdById: user.id, isAvailable: "AVAILABLE" },
      select: { id: true, slug: true },
    });
    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    const key = await prisma.bucketApiKey.findFirst({
      where: { bucketId: bucket.id, accessKeyId },
    });
    if (!key) {
      return NextResponse.json(
        { status: "error", message: "API key not found" },
        { status: 404 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const rateKey = `bucket-key-rotate:${bucket.slug}:${ip}`;
    const rate = enforceRateLimit(rateKey, 20, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          status: "error",
          message: "Too many rotate attempts. Try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": `${Math.ceil((rate.retryAfterMs ?? 0) / 1000)}`,
          },
        }
      );
    }

    const newSecret = generateSecretAccessKey();
    const encryptedSecret = encryptSecret(newSecret);
    await prisma.bucketApiKey.update({
      where: { id: key.id },
      data: {
        secretAccessKey: encryptedSecret,
        status: "ACTIVE",
        lastRotatedAt: new Date(),
      },
    });

    const auditInfo = getAuditRequestInfo(req);
    await logAudit({
      ...auditInfo,
      actorId: user.id,
      action: "bucket.api-key.rotate",
      resourceType: "Bucket",
      resourceId: bucket.id,
      status: 200,
      metadata: {
        bucketSlug: bucket.slug,
        accessKeyId,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "API key secret rotated",
      key: {
        accessKeyId,
        secretAccessKey: newSecret,
      },
    });
  } catch (error) {
    console.error("Rotate API key error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to rotate API key",
      },
      { status: 500 }
    );
  }
}
