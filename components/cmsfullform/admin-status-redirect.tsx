"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const STATUS_REDIRECTS: Record<number, string> = {
  401: "/auth/login",
  403: "/admin/unauthorized",
  404: "/admin/not-found",
};

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function isApiRequest(input: RequestInfo | URL) {
  const url = getRequestUrl(input);
  if (url.startsWith("/api/")) return true;
  try {
    const parsed = new URL(url, window.location.origin);
    return (
      parsed.origin === window.location.origin &&
      parsed.pathname.startsWith("/api/")
    );
  } catch {
    return false;
  }
}

export default function AdminStatusRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  useEffect(() => {
    redirectingRef.current = false;
  }, [pathname]);

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init) => {
      const res = await originalFetch(input, init);
      if (!redirectingRef.current && isApiRequest(input)) {
        const target = STATUS_REDIRECTS[res.status];
        if (target && pathname !== target) {
          redirectingRef.current = true;
          router.replace(target);
        }
      }
      return res;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [pathname, router]);

  return null;
}
