import crypto from "crypto";

export function generateAccessKeyId() {
  return "AKIA-" + crypto.randomBytes(8).toString("hex").toUpperCase();
}

export function generateSecretAccessKey() {
  return crypto.randomBytes(32).toString("base64");
}
