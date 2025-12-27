export type AuditLogActor = {
  id: number;
  name: string;
  profilePicture: string | null;
  role: string | null;
} | null;

export type AuditLogItem = {
  id: number;
  action: string;
  resourceType: string;
  resourceId: string | null;
  status: number;
  createdAt: string;
  metadata: unknown;
  actor: AuditLogActor;
};

type StatusKey = "success" | "warning" | "error" | "info";

const ACTION_LABELS: Record<string, string> = {
  "auth.login.success": "Login Success",
  "auth.login.failed": "Login Failed",
  "auth.login.disabled": "Login Disabled",
  "auth.login.rate_limited": "Login Rate Limited",
  "auth.logout": "Logged Out",
  "bucket.access-key.regenerate": "Access Key Regenerated",
  "bucket.permission.update": "Bucket Permission Updated",
  "role.permissions.update": "Role Permissions Updated",
  "role.permissions.clone": "Role Permissions Cloned",
  "user.status.update": "User Status Updated",
  "user.password.reset": "User Password Reset",
  "user.role.update": "User Role Updated",
};

function toTitleCase(value: string) {
  return value
    .replace(/\./g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function asRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function getString(meta: Record<string, unknown> | null, key: string) {
  const value = meta ? meta[key] : null;
  return typeof value === "string" && value.trim().length > 0
    ? value
    : null;
}

function getNumber(meta: Record<string, unknown> | null, key: string) {
  const value = meta ? meta[key] : null;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function getStatusKey(status: number): StatusKey {
  if (status >= 500) return "error";
  if (status >= 400) return "warning";
  if (status >= 200) return "success";
  return "info";
}

export function formatActionLabel(action: string) {
  return ACTION_LABELS[action] ?? toTitleCase(action);
}

export function formatTarget(log: AuditLogItem) {
  const meta = asRecord(log.metadata);
  return (
    getString(meta, "bucketName") ||
    getString(meta, "bucketSlug") ||
    getString(meta, "filename") ||
    getString(meta, "name") ||
    getString(meta, "email") ||
    getString(meta, "slug") ||
    (log.resourceType && log.resourceId
      ? `${log.resourceType} #${log.resourceId}`
      : log.resourceType || "Unknown")
  );
}

export function formatDetails(log: AuditLogItem) {
  const meta = asRecord(log.metadata);
  const details: string[] = [];

  const oldName = getString(meta, "oldName");
  const newName = getString(meta, "newName");
  if (oldName && newName) {
    details.push(`${oldName} → ${newName}`);
  }

  const path = getString(meta, "path");
  if (path) {
    details.push(`path: ${path}`);
  }

  const permission = getString(meta, "permission");
  if (permission) {
    details.push(`permission: ${permission}`);
  }

  const removedMedia = getNumber(meta, "removedMedia");
  if (removedMedia !== null) {
    details.push(`removed media: ${removedMedia}`);
  }

  const removedFolders = getNumber(meta, "removedFolders");
  if (removedFolders !== null) {
    details.push(`removed folders: ${removedFolders}`);
  }

  const rolesUpdated = getNumber(meta, "rolesUpdated");
  if (rolesUpdated !== null) {
    details.push(`roles updated: ${rolesUpdated}`);
  }

  return details.length ? details.join(" • ") : null;
}

export function formatTimestamp(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString();
}
