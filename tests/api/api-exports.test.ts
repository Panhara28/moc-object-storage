import fs from "fs/promises";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { HTTP_METHODS, listApiRoutes } from "@/tests/helpers/api-routes";

const HTTP_METHOD_SET = new Set(HTTP_METHODS);

function isExported(modifiers?: readonly ts.Modifier[]) {
  return Boolean(
    modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
  );
}

async function getExportedHandlers(file: string) {
  const code = await fs.readFile(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    code,
    ts.ScriptTarget.Latest,
    true
  );
  const exported = new Set<string>();

  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement) && isExported(statement.modifiers)) {
      const name = statement.name?.text;
      if (name && HTTP_METHOD_SET.has(name)) {
        exported.add(name);
      }
      continue;
    }

    if (ts.isVariableStatement(statement) && isExported(statement.modifiers)) {
      for (const decl of statement.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) {
          continue;
        }
        const name = decl.name.text;
        if (HTTP_METHOD_SET.has(name)) {
          exported.add(name);
        }
      }
      continue;
    }

    if (
      ts.isExportDeclaration(statement) &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const element of statement.exportClause.elements) {
        const name = element.name.text;
        if (HTTP_METHOD_SET.has(name)) {
          exported.add(name);
        }
      }
    }
  }

  return exported;
}

describe("API route exports", () => {
  it("exports all detected HTTP handlers", async () => {
    const routes = await listApiRoutes();

    for (const route of routes) {
      const exportedHandlers = await getExportedHandlers(route.file);
      for (const method of route.methods) {
        expect(exportedHandlers.has(method)).toBe(true);
      }
    }
  });
});
