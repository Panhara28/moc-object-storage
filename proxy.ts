import { NextResponse, type NextRequest } from "next/server";
import { verifyTokenLite } from "@/lib/auth-lite";

// Admin routes that require auth redirect
const PROTECTED_ROUTES = ["/admin/dashboard", "/admin", "/settings"];

// API routes that can be called without UI context
const API_ALLOWLIST: RegExp[] = [
  /^\/api\/auth\/login/,
  /^\/api\/auth\/logout/,
  /^\/api\/buckets\/[^/]+\/download/,
  /^\/api\/buckets\/[^/]+\/upload-signed/,
  /^\/api\/dev\/seed/,
];

function isUiContext(request: NextRequest) {
  const uiHeader = request.headers.get("x-ui-request");
  if (uiHeader?.toLowerCase() === "true") return true;

  const secFetchSite = request.headers.get("sec-fetch-site");
  if (
    secFetchSite === "same-origin" ||
    secFetchSite === "same-site" ||
    secFetchSite === "none"
  ) {
    return true;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      if (new URL(referer).origin === request.nextUrl.origin) return true;
    } catch {
      /* ignore bad referer */
    }
  }

  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Gate API requests to UI context unless allowlisted
  if (pathname.startsWith("/api/")) {
    if (API_ALLOWLIST.some((pattern) => pattern.test(pathname))) {
      return NextResponse.next();
    }

    if (isUiContext(request)) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { status: "error", message: "Forbidden" },
      { status: 403 }
    );
  }

  // Protect admin routes with login redirect
  const requiresAuth = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (!requiresAuth) return NextResponse.next();

  const token = request.cookies.get("session")?.value;
  if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));

  const decoded = verifyTokenLite(token);
  if (!decoded)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/dashboard/:path*",
    "/admin/:path*",
    "/settings/:path*",
  ],
};
