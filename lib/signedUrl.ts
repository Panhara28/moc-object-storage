import crypto from "crypto";

const SIGNING_SECRET = process.env.SIGNING_SECRET || "";

export type SignedUrlAction = "download" | "upload";

export interface SignedPayload {
  bucket: string;
  action: SignedUrlAction;
  mediaSlug?: string;
  storedFilename?: string;
  filename?: string;
  mimetype?: string;
  path?: string | null;
  userId?: number | null;
  exp: number; // epoch seconds
}

function getSecret() {
  if (!SIGNING_SECRET) {
    throw new Error("SIGNING_SECRET is not configured.");
  }
  return SIGNING_SECRET;
}

export function signPayload(payload: SignedPayload): string {
  const secret = getSecret();
  const data = JSON.stringify(payload);
  const signature = crypto.createHmac("sha256", secret).update(data).digest("hex");
  const token = Buffer.from(`${data}.${signature}`).toString("base64url");
  return token;
}

export function verifyPayload(token: string): SignedPayload | null {
  const secret = getSecret();
  let decoded: string;
  try {
    decoded = Buffer.from(token, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const lastDot = decoded.lastIndexOf(".");
  if (lastDot === -1) return null;

  const data = decoded.slice(0, lastDot);
  const signature = decoded.slice(lastDot + 1);
  const expected = crypto.createHmac("sha256", secret).update(data).digest("hex");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const payload = JSON.parse(data) as SignedPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}
