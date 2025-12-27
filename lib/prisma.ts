import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const connectionLimit = Number(process.env.DB_CONNECTION_LIMIT) || 5;
const adapter = new PrismaMariaDb(
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    socketPath: process.env.DB_SOCKET_PATH,
    connectionLimit,
    acquireTimeout: Number(process.env.DB_ACQUIRE_TIMEOUT_MS) || 10_000,
    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT_MS) || 10_000,
  },
  {
    onConnectionError: (error) => {
      console.error("Prisma MariaDB connection is error:", error);
    },
  }
);

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
