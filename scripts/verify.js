import "dotenv/config";
import { Command } from "commander";

import prisma from "../src/config/prisma.js";
import { createChainHash } from "../src/utils/hash.js";

const program = new Command();

program
  .name("verify")
  .description("Verify the integrity of the append-only log chain")
  .version("1.0.0");

program.action(async () => {
  try {
    const logs = await prisma.log.findMany({
      orderBy: {
        id: "asc",
      },
    });

    console.log("\n==============================");
    console.log("CHAIN VERIFICATION");
    console.log("==============================\n");

    if (logs.length === 0) {
      console.log("✓ No log entries found.");
      process.exit(0);
    }

    let previousHash = null;

    for (const log of logs) {
      const expectedHash = createChainHash({
        actor: log.actor,
        action: log.action,
        payload: log.payload,
        previousHash,
      });

      if (log.previousHash !== previousHash) {
        console.log(`❌ Verification FAILED`);
        console.log(`Broken Entry : ${log.id}`);
        console.log(`Reason       : Previous hash mismatch`);

        process.exit(1);
      }

      if (expectedHash !== log.hash) {
        console.log(`❌ Verification FAILED`);
        console.log(`Broken Entry : ${log.id}`);
        console.log(`Reason       : Hash mismatch`);

        process.exit(1);
      }

      previousHash = log.hash;
    }

    console.log(`✅ Verification PASSED`);
    console.log(`Entries Checked : ${logs.length}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
});

program.parse();