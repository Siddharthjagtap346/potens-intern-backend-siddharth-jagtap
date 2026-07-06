import { PrismaClient } from "@prisma/client";
import logger from "../logger/logger.js";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  logger.debug({
    query: e.query,
    params: e.params,
    duration: `${e.duration} ms`,
  });
});

process.on("SIGINT", async () => {
  logger.info("Disconnecting Prisma...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("Disconnecting Prisma...");
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;