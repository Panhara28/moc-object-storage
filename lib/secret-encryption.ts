import crypto from "crypto";

const ENCRYPTION_ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const DEFAULT_SECRET_KEY = "moc-default-secret-key-should-change";

const encryptionKeySource =
  process.env.SECRET_ENCRYPTION_KEY || DEFAULT_SECRET_KEY;
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(encryptionKeySource)
  .digest();

function ensureValidPayload(
  ivHex?: string,
  tagHex?: string,
  cipherHex?: string
) {
  if (!ivHex || !tagHex || !cipherHex) {
    throw new Error("Invalid encrypted secret payload");
  }
}

export function encryptSecret(secret: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(secret, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString(
    "hex"
  )}`;
}

export function decryptSecret(encrypted: string) {
  const [ivHex, tagHex, cipherHex] = encrypted.split(":");
  ensureValidPayload(ivHex, tagHex, cipherHex);
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    ENCRYPTION_KEY,
    Buffer.from(ivHex!, "hex")
  );
  decipher.setAuthTag(Buffer.from(tagHex!, "hex"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(cipherHex!, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
