import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
let loginAttemptsTableReady: Promise<unknown> | null = null;

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

function ensureLoginAttemptsTable() {
  if (loginAttemptsTableReady) return loginAttemptsTableReady;
  loginAttemptsTableReady = prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      \`key\` VARCHAR(255) NOT NULL UNIQUE,
      count INT NOT NULL DEFAULT 0,
      firstAttemptAt DATETIME NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  return loginAttemptsTableReady;
}

async function getRateLimitState(key: string) {
  await ensureLoginAttemptsTable();
  const rows = await prisma.$queryRaw<
    { count: number; firstAttemptAt: Date | string }[]
  >`SELECT count, firstAttemptAt FROM login_attempts WHERE \`key\` = ${key} LIMIT 1`;
  const entry = rows[0];
  if (!entry) {
    return { limited: false, retryAfterSeconds: null };
  }

  const firstAttemptAt =
    entry.firstAttemptAt instanceof Date
      ? entry.firstAttemptAt
      : new Date(entry.firstAttemptAt);
  const elapsed = Date.now() - firstAttemptAt.getTime();
  if (elapsed > RATE_LIMIT_WINDOW_MS) {
    await prisma.$executeRaw`DELETE FROM login_attempts WHERE \`key\` = ${key}`;
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
  await ensureLoginAttemptsTable();
  const rows = await prisma.$queryRaw<
    { count: number; firstAttemptAt: Date | string }[]
  >`SELECT count, firstAttemptAt FROM login_attempts WHERE \`key\` = ${key} LIMIT 1`;
  const entry = rows[0];
  const now = new Date();
  if (
    !entry ||
    Date.now() -
      (entry.firstAttemptAt instanceof Date
        ? entry.firstAttemptAt.getTime()
        : new Date(entry.firstAttemptAt).getTime()) >
      RATE_LIMIT_WINDOW_MS
  ) {
    await prisma.$executeRaw`
      INSERT INTO login_attempts (\`key\`, count, firstAttemptAt, createdAt, updatedAt)
      VALUES (${key}, 1, ${now}, ${now}, ${now})
      ON DUPLICATE KEY UPDATE
        count = 1,
        firstAttemptAt = ${now},
        updatedAt = ${now}
    `;
    return;
  }
  await prisma.$executeRaw`
    UPDATE login_attempts
    SET count = count + 1, updatedAt = ${now}
    WHERE \`key\` = ${key}
  `;
}

async function clearAttempts(key: string) {
  await ensureLoginAttemptsTable();
  await prisma.$executeRaw`DELETE FROM login_attempts WHERE \`key\` = ${key}`;
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
