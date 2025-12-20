import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

/* ------------------------------------------------- */
/* SIGN TOKEN                                         */
/* ------------------------------------------------- */
export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/* ------------------------------------------------- */
/* Verify JWT                                         */
/* ------------------------------------------------- */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/* ------------------------------------------------- */
/* Get Authenticated User (Next.js 16 compatible)     */
/* ------------------------------------------------- */
export async function getAuthUser(req: Request) {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((v) => v.split("="))
  );

  const token = cookies["session"];

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded || typeof decoded === "string") return null;
  const payload = decoded as JwtPayload & {
    id?: number;
    roleId?: number | null;
  };
  if (typeof payload.id !== "number") return null;
  return prisma.user.findUnique({
    where: { id: payload.id },
    include: {
      role: {
        include: {
          permissions: {
            include: { module: true },
          },
        },
      },
    },
  });
}
