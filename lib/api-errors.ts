import { NextResponse } from "next/server";

type ApiErrorOptions = {
  status: number;
  code: string;
  message: string;
  hint?: string;
  error?: unknown;
};

type ApiErrorBody = {
  status: "error";
  code: string;
  message: string;
  requestId: string;
  hint?: string;
  debug?: string;
};

function generateRequestId() {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}`;
}

export function getRequestId(request?: Request | null) {
  return request?.headers.get("x-request-id") ?? generateRequestId();
}

export function jsonError(request: Request | null, options: ApiErrorOptions) {
  const requestId = getRequestId(request);

  if (options.error) {
    console.error(
      `[${requestId}] ${options.code}: ${options.message}`,
      options.error
    );
  }

  const body: ApiErrorBody = {
    status: "error",
    code: options.code,
    message: options.message,
    requestId,
  };

  if (options.hint) {
    body.hint = options.hint;
  }

  if (options.error && process.env.NODE_ENV !== "production") {
    body.debug =
      options.error instanceof Error
        ? options.error.message
        : String(options.error);
  }

  const headers = new Headers();
  headers.set("x-request-id", requestId);

  return NextResponse.json(body, { status: options.status, headers });
}

export function uiContextForbidden(request: Request) {
  return jsonError(request, {
    status: 403,
    code: "API_UI_CONTEXT_REQUIRED",
    message: "Forbidden: UI context required.",
    hint: "Send x-ui-request: true or call from same-origin UI.",
  });
}
