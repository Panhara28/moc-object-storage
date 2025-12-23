import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorize, getAuthUser } from "@/lib/authorized";
import { signPayload, SignedPayload } from "@/lib/signedUrl";
import { getAuditRequestInfo, logAudit } from "@/lib/audit";

const DEFAULT_SIGNED_URL_TTL_SECONDS = 900;
const MAX_SIGNED_URL_TTL_SECONDS =
  Number(process.env.MAX_SIGNED_URL_TTL_SECONDS) || 60 * 60;

type Body =
  | {
      action: "download";
      mediaSlug: string;
      expiresInSeconds?: number;
    }
  | {
      action: "upload";
      filename: string;
      path?: string | null;
      expiresInSeconds?: number;
    };

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

function clampTtlSeconds(value?: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return DEFAULT_SIGNED_URL_TTL_SECONDS;
  }
  if (value <= 0) return DEFAULT_SIGNED_URL_TTL_SECONDS;
  return Math.min(Math.floor(value), MAX_SIGNED_URL_TTL_SECONDS);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auditInfo = getAuditRequestInfo(req);
    const { slug } = await params;
    let body: Body;
    try {
      body = (await req.json()) as Body;
    } catch {
      return NextResponse.json(
        { status: "error", message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || !("action" in body)) {
      return NextResponse.json(
        { status: "error", message: "Missing action." },
        { status: 400 }
      );
    }

    if (body.action === "download") {
      const auth = await authorize(req, "media-library", "read");
      if (!auth.ok) {
        return NextResponse.json(
          { status: "error", message: auth.message },
          { status: auth.status }
        );
      }
      const authUser = auth.user;
      if (!authUser) {
        return NextResponse.json(
          { status: "error", message: "Unauthorized." },
          { status: 401 }
        );
      }

      const bucket = await prisma.bucket.findUnique({
        where: { slug, isAvailable: "AVAILABLE" },
        select: { id: true, name: true, createdById: true },
      });

      if (!bucket || bucket.createdById !== authUser.id) {
        return NextResponse.json(
          { status: "error", message: "Bucket not found or unavailable." },
          { status: 404 }
        );
      }

      const media = await prisma.media.findUnique({
        where: { slug: body.mediaSlug },
        select: {
          slug: true,
          filename: true,
          storedFilename: true,
          mimetype: true,
          path: true,
          bucketId: true,
          isAccessible: true,
        },
      });

      if (!media || media.bucketId !== bucket.id) {
        return NextResponse.json(
          { status: "error", message: "Media not found in this bucket." },
          { status: 404 }
        );
      }

      if (media.isAccessible !== "PUBLIC" && media.isAccessible !== "PRIVATE") {
        return NextResponse.json(
          { status: "error", message: "Media is not accessible." },
          { status: 403 }
        );
      }

      const exp =
        Math.floor(Date.now() / 1000) + clampTtlSeconds(body.expiresInSeconds);

      const payload: SignedPayload = {
        action: "download",
        bucket: bucket.name,
        mediaSlug: media.slug,
        storedFilename: media.storedFilename,
        filename: media.filename,
        mimetype: media.mimetype,
        path: media.path ?? null,
        exp,
      };

      const token = signPayload(payload);
      await logAudit({
        ...auditInfo,
        actorId: authUser.id,
        action: "media.signed-url.download",
        resourceType: "Media",
        resourceId: media.slug,
        status: 200,
        metadata: {
          bucketSlug: slug,
          expiresAt: exp,
        },
      });
      return NextResponse.json({
        status: "ok",
        url: `/api/buckets/${slug}/download?token=${token}`,
        token,
        expiresAt: exp,
      });
    }

    if (body.action === "upload") {
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
          { status: "error", message: "Unauthorized." },
          { status: 401 }
        );
      }

      const bucket = await prisma.bucket.findUnique({
        where: { slug, isAvailable: "AVAILABLE" },
        select: { id: true, name: true, createdById: true },
      });

      if (!bucket || bucket.createdById !== user.id) {
        return NextResponse.json(
          { status: "error", message: "Bucket not found or unavailable." },
          { status: 404 }
        );
      }

      const exp =
        Math.floor(Date.now() / 1000) + clampTtlSeconds(body.expiresInSeconds);

      const payload: SignedPayload = {
        action: "upload",
        bucket: bucket.name,
        filename: body.filename,
        path: null,
        userId: user.id,
        exp,
      };

      if ("path" in body) {
        const rawPath = typeof body.path === "string" ? body.path : null;
        const normalizedPath = normalizePath(rawPath);
        if (rawPath && !normalizedPath) {
          return NextResponse.json(
            { status: "error", message: "Invalid path." },
            { status: 400 }
          );
        }
        payload.path = normalizedPath;
      }

      const token = signPayload(payload);
      await logAudit({
        ...auditInfo,
        actorId: user.id,
        action: "media.signed-url.upload",
        resourceType: "Bucket",
        resourceId: bucket.id,
        status: 200,
        metadata: {
          bucketSlug: slug,
          filename: body.filename,
          path: payload.path ?? null,
          expiresAt: exp,
        },
      });
      return NextResponse.json({
        status: "ok",
        url: `/api/buckets/${slug}/upload-signed?token=${token}`,
        token,
        expiresAt: exp,
      });
    }

    return NextResponse.json(
      { status: "error", message: "Invalid action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Signed URL generation error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to generate signed URL.",
      },
      { status: 500 }
    );
  }
}
