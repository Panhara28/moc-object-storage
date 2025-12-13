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
        },
      });

      if (!media || media.bucketId !== bucket.id) {
        return NextResponse.json(
          { status: "error", message: "Media not found in this bucket." },
          { status: 404 }
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
        path: body.path ?? null,
        userId: user.id,
        exp,
      };

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
