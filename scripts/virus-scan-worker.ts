import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const POLL_INTERVAL_MS =
  Number(process.env.VIRUSTOTAL_WORKER_POLL_MS) || 2000;

let shuttingDown = false;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const prisma = (await import("@/lib/prisma")).default;
  const { processNextVirusScanJob } = await import("@/lib/virustotal");
  while (!shuttingDown) {
    const didWork = await processNextVirusScanJob();
    if (!didWork) {
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
