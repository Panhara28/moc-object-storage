import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize } from "@/lib/authorized";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";
import {
  generateAccessKeyId,
  generateSecretAccessKey,
} from "@/lib/key-utils";
import { encryptSecret } from "@/lib/secret-encryption";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function resolveBucket(slug: string) {
  const bucket = await prisma.bucket.findFirst({
    where: { slug, isAvailable: "AVAILABLE" },
  });
  return bucket;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const auth = await authorize(req, "buckets", "read");
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
    const bucket = await resolveBucket(slug);
    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    const keys = await prisma.bucketApiKey.findMany({
      where: { bucketId: bucket.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      status: "ok",
      keys: keys.map((key) => ({
        id: key.id,
        name: key.name,
        accessKeyId: key.accessKeyId,
        status: key.status,
        createdAt: key.createdAt.toISOString(),
        updatedAt: key.updatedAt.toISOString(),
        lastRotatedAt: key.lastRotatedAt?.toISOString() ?? null,
        lastUsedAt: key.lastUsedAt?.toISOString() ?? null,
      })),
    });
  } catch (error: unknown) {
    console.error("List API keys error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to load API keys",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const auth = await authorize(req, "buckets", "create");
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
    const bucket = await resolveBucket(slug, user.id);
    if (!bucket) {
      return NextResponse.json(
        { status: "error", message: "Bucket not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const name = (body.name as string | undefined)?.trim();
    if (name && name.length === 0) {
      return NextResponse.json(
        { status: "error", message: "Key name cannot be empty." },
        { status: 400 }
      );
    }

    const accessKeyId = generateAccessKeyId();
    const secretAccessKey = generateSecretAccessKey();
    const encryptedSecret = encryptSecret(secretAccessKey);

    const keyName = name || `key-${Date.now()}`;

    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const rateKey = `bucket-key-create:${bucket.slug}:${ip}`;
    const rate = enforceRateLimit(rateKey, 10, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          status: "error",
          message: "Too many key generation requests. Try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": `${Math.ceil((rate.retryAfterMs ?? 0) / 1000)}`,
          },
        }
      );
    }

    const key = await prisma.bucketApiKey.create({
      data: {
        bucketId: bucket.id,
        name: keyName,
        accessKeyId,
        secretAccessKey: encryptedSecret,
        createdById: user.id,
      },
    });

    const auditInfo = getAuditRequestInfo(req);
    await logAudit({
      ...auditInfo,
      actorId: user.id,
      action: "bucket.api-key.create",
      resourceType: "Bucket",
      resourceId: bucket.id,
      status: 201,
      metadata: {
        bucketSlug: bucket.slug,
        accessKeyId: key.accessKeyId,
      },
    });

    return NextResponse.json({
      status: "ok",
      message: "API key created",
      key: {
        id: key.id,
        name: key.name,
        accessKeyId: key.accessKeyId,
        status: key.status,
        createdAt: key.createdAt.toISOString(),
      },
        credentials: {
          accessKeyId: key.accessKeyId,
          secretAccessKey,
        },
    });
  } catch (error) {
    console.error("Create API key error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to create API key",
      },
      { status: 500 }
    );
  }
}
