export function hasHTML(value: unknown): value is { html: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "html" in value &&
    typeof (value as Record<string, unknown>).html === "string"
  );
}
