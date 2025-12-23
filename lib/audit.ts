import prisma from "@/lib/prisma";
import type { InputJsonValue } from "../app/generated/prisma/internal/prismaNamespace";

export type AuditLogInput = {
  actorId?: number | null;
  action: string;
  resourceType: string;
  resourceId?: string | number | null;
  method?: string;
  path?: string;
  status?: number;
  ip?: string | null;
  userAgent?: string | null;
  requestId?: string | null;
  traceId?: string | null;
  metadata?: InputJsonValue | null;
};

export function getAuditRequestInfo(req?: Request | null) {
  if (!req) {
    return {
      ip: null,
      userAgent: null,
      requestId: null,
      traceId: null,
      method: "UNKNOWN",
      path: "unknown",
    };
  }
  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    null;
  const userAgent = req.headers.get("user-agent");
  const requestId =
    req.headers.get("x-request-id") || req.headers.get("cf-ray");
  const traceId =
    req.headers.get("traceparent") ||
    req.headers.get("x-b3-traceid") ||
    req.headers.get("x-amzn-trace-id");
  const path = (() => {
    try {
      return new URL(req.url).pathname;
    } catch {
      return "unknown";
    }
  })();

  return {
    ip,
    userAgent,
    requestId,
    traceId,
    method: req.method,
    path,
  };
}

export async function logAudit(input: AuditLogInput) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: input.actorId ?? null,
        action: input.action,
        resourceType: input.resourceType,
        resourceId:
          input.resourceId === null || input.resourceId === undefined
            ? null
            : String(input.resourceId),
        method: input.method ?? "UNKNOWN",
        path: input.path ?? "unknown",
        status: input.status ?? 0,
        ip: input.ip ?? null,
        userAgent: input.userAgent ?? null,
        requestId: input.requestId ?? null,
        traceId: input.traceId ?? null,
        metadata: input.metadata ?? undefined,
      },
    });
  } catch (error) {
    // Avoid breaking requests if audit logging fails.
    console.error("Audit log failed:", error);
  }
}
