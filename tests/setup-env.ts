import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { afterAll } from "vitest";

const envTestPath = path.join(process.cwd(), ".env.test");
const envLocalPath = path.join(process.cwd(), ".env.local");
const tmpStoragePath = path.join(process.cwd(), "tmp-test-storage");

if (fs.existsSync(envLocalPath)) {
  config({ path: envLocalPath });
} else if (fs.existsSync(envTestPath)) {
  config({ path: envTestPath });
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required to run API tests.");
}

afterAll(async () => {
  if (fs.existsSync(tmpStoragePath)) {
    await fs.promises.rm(tmpStoragePath, { recursive: true, force: true });
  }
});
