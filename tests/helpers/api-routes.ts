import fs from "fs/promises";
import path from "path";

export const API_ROOT = path.join(process.cwd(), "app/api");
export const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export type ApiRoute = {
  route: string;
  file: string;
  methods: HttpMethod[];
};

const METHOD_PATTERNS = HTTP_METHODS.reduce<Record<HttpMethod, RegExp[]>>(
  (acc, method) => {
    acc[method] = [
      new RegExp(`\\bexport\\s+(?:async\\s+)?function\\s+${method}\\b`),
      new RegExp(`\\bexport\\s+const\\s+${method}\\b`),
      new RegExp(`\\bexport\\s*\\{[^}]*\\b${method}\\b`),
    ];
    return acc;
  },
  {} as Record<HttpMethod, RegExp[]>
);

async function walk(dir: string, out: string[] = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
      continue;
    }
    if (entry.isFile() && entry.name === "route.ts") {
      out.push(full);
    }
  }
  return out;
}

function fileToRoute(filePath: string) {
  const relative = path.relative(API_ROOT, filePath).replace(/\\/g, "/");
  return `/api/${relative.replace(/\\/g, "/").replace("/route.ts", "")}`;
}

export async function listApiRoutes(): Promise<ApiRoute[]> {
  const files = await walk(API_ROOT);
  const routes: ApiRoute[] = [];

  for (const file of files) {
    const code = await fs.readFile(file, "utf8");
    const methods = HTTP_METHODS.filter((method) =>
      METHOD_PATTERNS[method].some((pattern) => pattern.test(code))
    );

    if (methods.length === 0) {
      throw new Error(`No HTTP methods found in ${file}`);
    }

    routes.push({
      file,
      route: fileToRoute(file),
      methods,
    });
  }

  routes.sort((a, b) => a.route.localeCompare(b.route));
  return routes;
}
