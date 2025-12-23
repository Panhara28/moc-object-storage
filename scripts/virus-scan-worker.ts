import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const POLL_INTERVAL_MS =
  Number(process.env.VIRUSTOTAL_WORKER_POLL_MS) || 2000;

let shuttingDown = false;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectWithRetry(prisma: { $connect: () => Promise<void> }) {
  while (!shuttingDown) {
    try {
      await prisma.$connect();
      return;
    } catch (error) {
      console.error("Database connection failed, retrying...", error);
      await sleep(POLL_INTERVAL_MS);
    }
  }
}

async function run() {
  const prisma = (await import("@/lib/prisma")).default;
  const { processNextVirusScanJob } = await import("@/lib/virustotal");
  await connectWithRetry(prisma);
  while (!shuttingDown) {
    try {
      const didWork = await processNextVirusScanJob();
      if (!didWork) {
        await sleep(POLL_INTERVAL_MS);
      }
    } catch (error) {
      console.error("Virus scan worker failed:", error);
      await sleep(POLL_INTERVAL_MS);
    }
  }
  await prisma.$disconnect();
}

process.on("SIGINT", () => {
  shuttingDown = true;
});

process.on("SIGTERM", () => {
  shuttingDown = true;
});

run().catch((error) => {
  console.error("Virus scan worker failed:", error);
  process.exitCode = 1;
});
