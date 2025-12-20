const fs = require("fs");
const path = require("path");
const { listApiRoutes } = require("./list-api-routes");

const CASES_PATH = path.join(process.cwd(), "tests/api/api-cases.ts");

function extractImplementedCases(content) {
  const results = [];
  const routeRegex = /route\s*:\s*["']([^"']+)["']/g;
  const methodRegex = /method\s*:\s*["']([^"']+)["']/g;

  const routes = [];
  let match = null;
  while ((match = routeRegex.exec(content))) {
    routes.push({ index: match.index, route: match[1] });
  }

  let methodMatch = null;
  const methods = [];
  while ((methodMatch = methodRegex.exec(content))) {
    methods.push({ index: methodMatch.index, method: methodMatch[1] });
  }

  for (const routeEntry of routes) {
    const methodEntry = methods
      .filter((m) => m.index < routeEntry.index)
      .slice(-1)[0];
    if (methodEntry) {
      results.push({
        route: routeEntry.route,
        method: methodEntry.method,
      });
    }
  }

  return results;
}

async function main() {
  const routes = await listApiRoutes();
  const all = routes.flatMap((route) =>
    route.methods.map((method) => ({
      method,
      route: route.route,
    }))
  );

  const content = fs.readFileSync(CASES_PATH, "utf8");
  const implemented = extractImplementedCases(content);

  const implementedSet = new Set(
    implemented.map((entry) => `${entry.method} ${entry.route}`)
  );

  const missing = all.filter(
    (entry) => !implementedSet.has(`${entry.method} ${entry.route}`)
  );

  console.log(JSON.stringify({ total: all.length, missing }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
