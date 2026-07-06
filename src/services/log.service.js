import prisma from "../config/prisma.js";
import { createChainHash } from "../utils/hash.js";

class LogService {
  async createLog(data) {
    const { actor, action, payload } = data;

    const previousLog = await prisma.log.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const previousHash = previousLog
      ? previousLog.hash
      : null;

    const hash = createChainHash({
      actor,
      action,
      payload,
      previousHash,
    });

    const log = await prisma.log.create({
      data: {
        actor,
        action,
        payload,
        previousHash,
        hash,
      },
    });

    return log;
  }

  async getLogById(id) {
    return prisma.log.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async getLastLog() {
    return prisma.log.findFirst({
      orderBy: {
        id: "desc",
      },
    });
  }

  async getAllLogs() {
    return prisma.log.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }
}

export default new LogService();