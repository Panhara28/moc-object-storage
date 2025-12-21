import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

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

async function getRateLimitState(key: string) {
  const entry = await prisma.loginAttempt.findUnique({
    where: { key },
    select: {
      count: true,
      firstAttemptAt: true,
    },
  });
  if (!entry) {
    return { limited: false, retryAfterSeconds: null };
  }

  const elapsed = Date.now() - entry.firstAttemptAt.getTime();
  if (elapsed > RATE_LIMIT_WINDOW_MS) {
    await prisma.loginAttempt.deleteMany({ where: { key } });
    return { limited: false, retryAfterSeconds: null };
  }

  const remainingMs = RATE_LIMIT_WINDOW_MS - elapsed;
  const retryAfterSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
  return {
    limited: entry.count >= RATE_LIMIT_MAX_ATTEMPTS,
    retryAfterSeconds,
  };
}

async function recordAttempt(key: string) {
  const now = new Date();
  const entry = await prisma.loginAttempt.findUnique({
    where: { key },
    select: {
      count: true,
      firstAttemptAt: true,
    },
  });
  if (!entry || now.getTime() - entry.firstAttemptAt.getTime() > RATE_LIMIT_WINDOW_MS) {
    await prisma.loginAttempt.upsert({
      where: { key },
      create: {
        key,
        count: 1,
        firstAttemptAt: now,
      },
      update: {
        count: 1,
        firstAttemptAt: now,
      },
    });
    return;
  }
  await prisma.loginAttempt.update({
    where: { key },
    data: {
      count: { increment: 1 },
    },
  });
}

async function clearAttempts(key: string) {
  await prisma.loginAttempt.deleteMany({ where: { key } });
}

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const clientKey = getClientKey(req, email);
  const rateLimit = await getRateLimitState(clientKey);
  if (rateLimit.limited) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds ?? 1),
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
    await recordAttempt(clientKey);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    await recordAttempt(clientKey);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (!user.isActive) {
    await recordAttempt(clientKey);
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
  await clearAttempts(clientKey);

  return res;
}
