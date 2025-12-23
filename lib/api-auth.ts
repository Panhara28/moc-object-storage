import { NextRequest } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { decryptSecret } from "@/lib/secret-encryption";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

const TIMESTAMP_DRIFT_MS =
  Number(process.env.API_KEY_TIMESTAMP_DRIFT_MS) || 5 * 60 * 1000;

async function recordFailure(
  req: NextRequest,
  message: string,
  status: number,
  metadata?: Record<string, unknown>
) {
  const auditInfo = getAuditRequestInfo(req);
  await logAudit({
    ...auditInfo,
    actorId: null,
    action: "bucket.api-key.auth-failure",
    resourceType: "BucketApiKey",
    status,
    metadata: { reason: message, ...metadata },
  });
}

export type ApiAuthResult =
  | { ok: true; key: { id: number; bucketId: number; bucket: { id: number; slug: string }; accessKeyId: string; secretAccessKey: string } }
  | { ok: false; status: number; message: string };

export async function authenticateApiKeyRequest(
  req: NextRequest
): Promise<ApiAuthResult> {
  const accessKeyId = req.headers.get("x-api-key");
  const signature = req.headers.get("x-api-signature");
  const timestampHeader = req.headers.get("x-api-timestamp");
  const payloadHash = req.headers.get("x-api-body-hash");

  if (!accessKeyId || !signature || !timestampHeader) {
    await recordFailure(
      req,
      "Missing authentication headers",
      401,
      { accessKeyId }
    );
    return { ok: false, status: 401, message: "Missing authentication headers." };
  }

  if (!payloadHash) {
    await recordFailure(req, "Missing body hash header", 400, { accessKeyId });
    return { ok: false, status: 400, message: "Missing body hash header." };
  }

  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rateKey = `api-auth:${accessKeyId}:${ip}`;
  const rate = enforceRateLimit(rateKey, 60, 60 * 1000);
  if (!rate.allowed) {
    await recordFailure(req, "Rate limit exceeded", 429, {
      accessKeyId,
      retryAfterMs: rate.retryAfterMs,
    });
    return {
      ok: false,
      status: 429,
      message: "Too many authentication attempts. Please wait.",
    };
  }

  const timestamp = Date.parse(timestampHeader);
  if (Number.isNaN(timestamp)) {
    await recordFailure(req, "Invalid timestamp", 400, { accessKeyId });
    return { ok: false, status: 400, message: "Invalid timestamp." };
  }

  if (Math.abs(Date.now() - timestamp) > TIMESTAMP_DRIFT_MS) {
    await recordFailure(
      req,
      "Timestamp outside allowed window",
      401,
      { accessKeyId }
    );
    return { ok: false, status: 401, message: "Request timestamp is outside the allowed window." };
  }

  const canonical = `${req.method}\n${req.nextUrl.pathname}\n${req.nextUrl.search}\n${timestampHeader}\n${payloadHash}`;

  const key = await prisma.bucketApiKey.findFirst({
    where: { accessKeyId, status: "ACTIVE" },
    include: { bucket: true },
  });

  if (!key) {
    await recordFailure(req, "API key not found or inactive", 401, { accessKeyId });
    return { ok: false, status: 401, message: "API key not found or inactive." };
  }

  let secretAccessKey: string;
  try {
    secretAccessKey = decryptSecret(key.secretAccessKey);
  } catch (error) {
    return { ok: false, status: 500, message: "Failed to read API key secret." };
  }

  const expectedSignature = crypto
    .createHmac("sha256", secretAccessKey)
    .update(canonical)
    .digest("hex");

  const provided = Buffer.from(signature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");
  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    await recordFailure(req, "Invalid signature", 401, {
      accessKeyId,
      providedSignature: signature,
      expectedSignature,
    });
    return { ok: false, status: 401, message: "Invalid signature." };
  }

  await prisma.bucketApiKey.update({
    where: { id: key.id },
    data: { lastUsedAt: new Date() },
  });

  return {
    ok: true,
    key: {
      id: key.id,
      bucketId: key.bucketId,
      bucket: { id: key.bucket.id, slug: key.bucket.slug },
      accessKeyId: key.accessKeyId,
      secretAccessKey: key.secretAccessKey,
    },
  };
}

async function findActiveApiKey(accessKeyId: string) {
  return prisma.bucketApiKey.findFirst({
    where: { accessKeyId, status: "ACTIVE" },
    include: { bucket: true },
  });
}

async function updateKeyUsage(keyId: number) {
  await prisma.bucketApiKey.update({
    where: { id: keyId },
    data: { lastUsedAt: new Date() },
  });
}

function recordSimpleFailure(
  req: NextRequest,
  message: string,
  status: number,
  metadata?: Record<string, unknown>
) {
  return recordFailure(req, message, status, metadata);
}
export async function authenticateSimpleApiKey(
  req: NextRequest,
  accessKeyId: string,
  secret: string,
  bucketSlug?: string
): Promise<ApiAuthResult> {
  const key = await findActiveApiKey(accessKeyId);
  if (!key) {
    await recordSimpleFailure(req, "API key not found or inactive", 401, {
      accessKeyId,
    });
    return { ok: false, status: 401, message: "Invalid API credentials." };
  }

  if (bucketSlug && bucketSlug !== key.bucket.slug) {
    await recordSimpleFailure(req, "Bucket slug mismatch", 403, {
      accessKeyId,
      bucketSlug,
      expectedSlug: key.bucket.slug,
    });
    return {
      ok: false,
      status: 403,
      message: "Bucket slug does not match API key.",
    };
  }

  let decrypted: string;
  try {
    decrypted = decryptSecret(key.secretAccessKey);
  } catch (error) {
    console.error("Failed to decrypt API key secret:", error);
    return { ok: false, status: 500, message: "Failed to read API key secret." };
  }

  const provided = Buffer.from(secret, "utf8");
  const expected = Buffer.from(decrypted, "utf8");
  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    await recordSimpleFailure(req, "Invalid secret key", 401, { accessKeyId });
    return { ok: false, status: 401, message: "Invalid API credentials." };
  }

  await updateKeyUsage(key.id);

  return {
    ok: true,
    key: {
      id: key.id,
      bucketId: key.bucketId,
      bucket: { id: key.bucket.id, slug: key.bucket.slug },
      accessKeyId: key.accessKeyId,
      secretAccessKey: key.secretAccessKey,
    },
  };
}

export async function getApiAuthentication(req: NextRequest) {
  const hasSignature =
    Boolean(req.headers.get("x-api-key")) &&
    Boolean(req.headers.get("x-api-signature")) &&
    Boolean(req.headers.get("x-api-timestamp"));
  if (hasSignature) {
    return authenticateApiKeyRequest(req);
  }
  const accessKey = req.headers.get("x-access-key");
  const secret = req.headers.get("x-secret-key");
  if (accessKey && secret) {
    const bucketSlug = req.headers.get("x-bucket-slug") ?? undefined;
    return authenticateSimpleApiKey(req, accessKey, secret, bucketSlug);
  }
  await recordFailure(req, "Missing API authentication headers", 401);
  return {
    ok: false,
    status: 401,
    message: "Missing API authentication headers.",
  };
}
