import jwt from "jsonwebtoken";

const AUDIENCE_JWT_SECRET = process.env.AUDIENCE_JWT_SECRET!;

export function audienceSignToken(payload: object) {
  return jwt.sign(payload, AUDIENCE_JWT_SECRET, { expiresIn: "7d" });
}

export function audienceVerifyToken(token: string) {
  try {
    return jwt.verify(token, AUDIENCE_JWT_SECRET);
  } catch {
    return null;
  }
}
