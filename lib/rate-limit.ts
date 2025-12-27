const STORE = new Map<
  string,
  { count: number; windowStart: number; blockedUntil: number | null }
>();

interface RateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
}

export function enforceRateLimit(
  key: string,
  maxHits: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = STORE.get(key);

  if (entry && entry.blockedUntil && now < entry.blockedUntil) {
    return { allowed: false, retryAfterMs: entry.blockedUntil - now };
  }

  if (!entry || now - entry.windowStart > windowMs) {
    STORE.set(key, {
      count: 1,
      windowStart: now,
      blockedUntil: null,
    });
    return { allowed: true };
  }

  entry.count += 1;
  if (entry.count > maxHits) {
    entry.blockedUntil = now + windowMs;
    return { allowed: false, retryAfterMs: windowMs };
  }

  STORE.set(key, entry);
  return { allowed: true };
}
