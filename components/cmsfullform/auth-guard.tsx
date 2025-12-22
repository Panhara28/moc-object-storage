"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type PermissionAction = "create" | "read" | "update" | "delete";
type PermissionMap = Record<
  string,
  { create: boolean; read: boolean; update: boolean; delete: boolean }
>;

type RouteRule = {
  pattern: RegExp;
  module?: string;
  action?: PermissionAction;
};

const routeRules: RouteRule[] = [
  { pattern: /^\/admin\/users\/[^/]+\/edit$/, module: "users", action: "update" },
  { pattern: /^\/admin\/users\/add$/, module: "users", action: "create" },
  { pattern: /^\/admin\/users\/lists$/, module: "users", action: "read" },
  { pattern: /^\/admin\/users\/[^/]+$/, module: "users", action: "read" },
  { pattern: /^\/admin\/assign-roles$/, module: "roles", action: "update" },
  { pattern: /^\/admin\/roles\/[^/]+\/edit$/, module: "roles", action: "update" },
  { pattern: /^\/admin\/buckets\/lists$/, module: "buckets", action: "read" },
  {
    pattern: /^\/admin\/buckets\/[^/]+\/media-library$/,
    module: "media-library",
    action: "read",
  },
  { pattern: /^\/admin\/buckets\/[^/]+$/, module: "media-library", action: "read" },
  { pattern: /^\/admin\/dashboard$/, module: "media-library", action: "read" },
  { pattern: /^\/admin\/v1\/api\/docs$/ },
  { pattern: /^\/admin\/auth\/profile$/ },
];

function getRouteRule(pathname: string) {
  return routeRules.find((rule) => rule.pattern.test(pathname));
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [permissions, setPermissions] = useState<PermissionMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadAuth = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.status === 401) {
          router.replace("/auth/login");
          return;
        }
        if (!res.ok) {
          throw new Error("Failed to load auth");
        }
        const payload = await res.json();
        if (active) {
          setPermissions((payload?.user?.permissions as PermissionMap) || {});
        }
      } catch (error) {
        console.error("Failed to load auth:", error);
        if (active) {
          setPermissions({});
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadAuth();
    return () => {
      active = false;
    };
  }, [router]);

  const accessCheck = useMemo(() => {
    const rule = getRouteRule(pathname);
    if (!rule || !rule.module || !rule.action) {
      return { allowed: true };
    }
    const modulePerms = permissions?.[rule.module];
    const allowed = Boolean(modulePerms && modulePerms[rule.action]);
    return {
      allowed,
      module: rule.module,
      action: rule.action,
    };
  }, [pathname, permissions]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Checking access...
      </div>
    );
  }

  if (!accessCheck.allowed) {
    router.replace("/admin/unauthorized");
    return null;
  }

  return <>{children}</>;
}
