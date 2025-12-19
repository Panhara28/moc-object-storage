import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connection";
import { authorize, getAuthUser } from "@/lib/authorized";
import { signPayload, SignedPayload } from "@/lib/signedUrl";

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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = (await req.json()) as Body;

    if (body.action === "download") {
      const auth = await authorize(req, "media-library", "read");
      if (!auth.ok) {
        return NextResponse.json(
          { status: "error", message: auth.message },
          { status: auth.status }
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
        Math.floor(Date.now() / 1000) + (body.expiresInSeconds ?? 900);

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
        select: { id: true, name: true },
      });

      if (!bucket) {
        return NextResponse.json(
          { status: "error", message: "Bucket not found or unavailable." },
          { status: 404 }
        );
      }

      const exp =
        Math.floor(Date.now() / 1000) + (body.expiresInSeconds ?? 900);

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
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
