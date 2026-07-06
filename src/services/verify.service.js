import logService from "./log.service.js";
import { createChainHash } from "../utils/hash.js";

class VerifyService {
  async verifyChain() {
    const logs = await logService.getAllLogs();

    if (logs.length === 0) {
      return {
        success: true,
        status: "PASS",
        totalEntries: 0,
        brokenEntryId: null,
      };
    }

    let previousHash = null;

    for (const log of logs) {
      const calculatedHash = createChainHash({
        actor: log.actor,
        action: log.action,
        payload: log.payload,
        previousHash,
      });

      if (log.previousHash !== previousHash) {
        return {
          success: false,
          status: "FAIL",
          brokenEntryId: log.id,
          reason: "Previous hash mismatch",
        };
      }

      if (log.hash !== calculatedHash) {
        return {
          success: false,
          status: "FAIL",
          brokenEntryId: log.id,
          reason: "Current hash mismatch",
        };
      }

      previousHash = log.hash;
    }

    return {
      success: true,
      status: "PASS",
      totalEntries: logs.length,
      brokenEntryId: null,
    };
  }
}

export default new VerifyService();