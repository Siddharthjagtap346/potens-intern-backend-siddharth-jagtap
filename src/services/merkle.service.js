import prisma from "../config/prisma.js";
import { buildMerkleRoot } from "../utils/merkle.js";

class MerkleService {
  async rebuildBatch(batchSize = Number(process.env.MERKLE_BATCH_SIZE || 100)) {
    const logs = await prisma.log.findMany({
      orderBy: {
        id: "asc",
      },
    });

    if (logs.length === 0) {
      return [];
    }

    const results = [];

    for (let i = 0; i < logs.length; i += batchSize) {
      const batch = logs.slice(i, i + batchSize);

      const hashes = batch.map((log) => log.hash);

      const root = buildMerkleRoot(hashes);

      await prisma.log.updateMany({
        where: {
          id: {
            in: batch.map((l) => l.id),
          },
        },
        data: {
          merkleRoot: root,
        },
      });

      results.push({
        startId: batch[0].id,
        endId: batch[batch.length - 1].id,
        merkleRoot: root,
        entries: batch.length,
      });
    }

    return results;
  }
  async updateBatchForLog(logId, batchSize = Number(process.env.MERKLE_BATCH_SIZE || 100)) {

    const batchIndex = Math.floor((logId - 1) / batchSize);

    const start = batchIndex * batchSize + 1;
    const end = start + batchSize - 1;

    const batch = await prisma.log.findMany({
        where:{
            id:{
                gte:start,
                lte:end
            }
        },
        orderBy:{
            id:"asc"
        }
    });

    if(batch.length===0){
        return;
    }

    const root = buildMerkleRoot(
        batch.map(x=>x.hash)
    );

    await prisma.log.updateMany({
        where:{
            id:{
                in:batch.map(x=>x.id)
            }
        },
        data:{
            merkleRoot:root
        }
    });

    return root;
}
}

export default new MerkleService();