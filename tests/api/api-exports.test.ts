import { pathToFileURL } from "url";
import { describe, expect, it } from "vitest";
import { listApiRoutes } from "@/tests/helpers/api-routes";

describe("API route exports", () => {
  it("exports all detected HTTP handlers", async () => {
    const routes = await listApiRoutes();

    for (const route of routes) {
      const mod = await import(pathToFileURL(route.file).href);
      for (const method of route.methods) {
        expect(typeof mod[method]).toBe("function");
      }
    }
  });
});
