import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const loginAttempts = new Map<
  string,
  { count: number; firstAttemptAt: number }
>();

function getClientKey(req: Request, email: unknown) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  const emailKey =
    typeof email === "string" && email.trim()
      ? email.trim().toLowerCase()
      : "unknown";
  return `${ip}:${emailKey}`;
}

function isRateLimited(key: string) {
  const entry = loginAttempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    loginAttempts.delete(key);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX_ATTEMPTS;
}

function recordAttempt(key: string) {
  const entry = loginAttempts.get(key);
  const now = Date.now();
  if (!entry || now - entry.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, firstAttemptAt: now });
    return;
  }
  entry.count += 1;
}

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const clientKey = getClientKey(req, email);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
        },
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
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

  if (!user) {
    recordAttempt(clientKey);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    recordAttempt(clientKey);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (!user.isActive) {
    recordAttempt(clientKey);
    return NextResponse.json({ error: "User disabled" }, { status: 403 });
  }

  const token = signToken({
    id: user.id,
    roleId: user.roleId,
  });

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  loginAttempts.delete(clientKey);

  return res;
}
