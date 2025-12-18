import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenLite } from "@/lib/auth-lite";

// ROUTES THAT REQUIRE AUTHENTICATION
const PROTECTED_ROUTES = ["/admin/dashboard", "/admin", "/settings"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this route is protected
  const requiresAuth = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!requiresAuth) {
    return NextResponse.next();
  }

  // Read JWT cookie
  const token = request.cookies.get("session")?.value;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Validate token (no DB calls)
  const decoded = verifyTokenLite(token);
  if (!decoded) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow access
  return NextResponse.next();
}

// Route Matcher
export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/:path*", "/settings/:path*"],
};
