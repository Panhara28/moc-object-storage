const fs = require("fs/promises");
const path = require("path");

const API_ROOT = path.join(process.cwd(), "app/api");
const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
];

const METHOD_PATTERNS = HTTP_METHODS.reduce((acc, method) => {
  acc[method] = [
    new RegExp(`\\bexport\\s+(?:async\\s+)?function\\s+${method}\\b`),
    new RegExp(`\\bexport\\s+const\\s+${method}\\b`),
    new RegExp(`\\bexport\\s*\\{[^}]*\\b${method}\\b`),
  ];
  return acc;
}, {});

async function walk(dir, out = []) {
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

function fileToRoute(filePath) {
  const relative = path.relative(API_ROOT, filePath).replace(/\\/g, "/");
  return `/api/${relative.replace("/route.ts", "")}`;
}

async function listApiRoutes() {
  const files = await walk(API_ROOT);
  const routes = [];

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

async function main() {
  const routes = await listApiRoutes();
  const flat = routes.flatMap((route) =>
    route.methods.map((method) => ({
      method,
      route: route.route,
      file: route.file,
    }))
  );
  console.log(JSON.stringify(flat, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { listApiRoutes, HTTP_METHODS };
