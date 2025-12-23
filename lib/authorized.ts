import { getAuthUser } from "./auth";

export async function authorize(
  req: Request,
  module: string,
  action: "create" | "read" | "update" | "delete"
) {
  const user = await getAuthUser(req);

  // Not logged in
  if (!user) {
    return {
      ok: false,
      status: 401,
      message: "You must be logged in to access this resource.",
    };
  }

  // ⭐ If user has NO role assigned
  if (!user.role) {
    return {
      ok: false,
      status: 403,
      message:
        "Your account does not have a role assigned. Please contact an administrator.",
    };
  }

  // ⭐ Safe: role exists here
  const moduleKey = module.toLowerCase();
  const moduleAliases: Record<string, Set<string>> = {
    buckets: new Set(["buckets", "bucket", "media-library", "spaces"]),
    "media-library": new Set([
      "media-library",
      "buckets",
      "bucket",
      "spaces",
    ]),
    spaces: new Set(["spaces", "media-library", "buckets"]),
    roles: new Set(["roles", "role", "users"]),
    users: new Set(["users", "user", "roles"]),
  };
  const aliases = moduleAliases[moduleKey] ?? null;
  const rolePermissions = user.role.permissions ?? [];

  if (aliases) {
    const matching = rolePermissions.filter((p) =>
      aliases.has(p.module.name.toLowerCase())
    );
    if (matching.length === 0) {
      return {
        ok: false,
        status: 403,
        message: `Your role (${user.role.name}) does not have access to the "${module}" module.`,
      };
    }
    const allowed = matching.some((p) => p[action]);
    if (!allowed) {
      const actionLabel =
        action === "create"
          ? "create"
          : action === "read"
          ? "view"
          : action === "update"
          ? "update"
          : "delete";

      return {
        ok: false,
        status: 403,
        message: `You do not have permission to ${actionLabel} ${module}. Please contact an administrator if you believe this is a mistake.`,
      };
    }
    return { ok: true, user };
  }

  const perm = rolePermissions.find(
    (p) => p.module.name.toLowerCase() === moduleKey
  );

  if (!perm) {
    return {
      ok: false,
      status: 403,
      message: `Your role (${user.role.name}) does not have access to the "${module}" module.`,
    };
  }

  if (!perm[action]) {
    const actionLabel =
      action === "create"
        ? "create"
        : action === "read"
        ? "view"
        : action === "update"
        ? "update"
        : "delete";

    return {
      ok: false,
      status: 403,
      message: `You do not have permission to ${actionLabel} ${module}. Please contact an administrator if you believe this is a mistake.`,
    };
  }

  return { ok: true, user };
}

export { getAuthUser };
