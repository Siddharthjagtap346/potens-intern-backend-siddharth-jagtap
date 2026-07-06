import prisma from "../config/prisma.js";

class ExportService {
  async exportLogs({ actor, from, to }) {
    const where = {};

    if (actor) {
      where.actor = actor;
    }

    if (from || to) {
      where.createdAt = {};

      if (from) {
        where.createdAt.gte = new Date(from);
      }

      if (to) {
        where.createdAt.lte = new Date(to);
      }
    }

    const logs = await prisma.log.findMany({
      where,
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      exportedAt: new Date().toISOString(),
      total: logs.length,
      logs,
    };
  }
}

export default new ExportService();