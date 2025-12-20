import { describe, expect, it } from "vitest";
import { listApiRoutes } from "@/tests/helpers/api-routes";
import { apiCases } from "@/tests/api/api-cases";
import { generatedApiCases } from "@/tests/api/api-cases.generated";

function caseKey(entry: { method: string; route: string }) {
  return `${entry.method} ${entry.route}`;
}

describe("API coverage registry", () => {
  it("matches the current app/api routes", async () => {
    const routes = await listApiRoutes();
    const actual = new Set(
      routes.flatMap((route) =>
        route.methods.map((method) => caseKey({ method, route: route.route }))
      )
    );

    const declared = new Set(
      [...generatedApiCases, ...apiCases].map((entry) => caseKey(entry))
    );

    const missing = Array.from(actual).filter((key) => !declared.has(key));
    const extra = Array.from(declared).filter((key) => !actual.has(key));

    expect(missing).toEqual([]);
    expect(extra).toEqual([]);
  });
});
