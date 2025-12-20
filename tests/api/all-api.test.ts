import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { HTTP_METHODS } from "@/tests/helpers/api-routes";
import { resetDb, disconnectDb } from "@/tests/helpers/db";
import { apiCases, type ApiCase } from "@/tests/api/api-cases";
import { generatedApiCases } from "@/tests/api/api-cases.generated";

const methodOrder = new Map(
  HTTP_METHODS.map((method, index) => [method, index])
);

function caseKey(entry: ApiCase) {
  return `${entry.method} ${entry.route}`;
}

function mergeApiCases(...groups: ApiCase[]) {
  const map = new Map<string, ApiCase>();
  for (const entry of groups) {
    map.set(caseKey(entry), entry);
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.route !== b.route) return a.route.localeCompare(b.route);
    return (methodOrder.get(a.method) ?? 0) - (methodOrder.get(b.method) ?? 0);
  });
}

const allCases = mergeApiCases(...generatedApiCases, ...apiCases);

describe("API cases", () => {
  beforeEach(async () => {
    await resetDb();
  });

  afterAll(async () => {
    await resetDb();
    await disconnectDb();
  });

  for (const entry of allCases) {
    const title = `${entry.method} ${entry.route} - ${entry.name}`;

    if (entry.todo) {
      it.todo(title);
      continue;
    }

    if (entry.skip) {
      it.skip(title);
      continue;
    }

    it(title, async () => {
      if (!entry.handler || !entry.build || entry.expectStatus === undefined) {
        throw new Error(
          `Missing handler/build/expectStatus for ${entry.method} ${entry.route}`
        );
      }

      const { req, params } = await entry.build();
      const res = await entry.handler(req, {
        params: Promise.resolve(params ?? {}),
      });

      expect(res.status).toBe(entry.expectStatus);
      if (entry.expectJson !== false) {
        const contentType = res.headers.get("content-type") || "";
        expect(contentType).toContain("application/json");
      }
      if (entry.verify) {
        await entry.verify(res);
      }
    });
  }
});
