import logService from "../services/log.service.js";
import { createChainHash } from "../utils/hash.js";

class LogController {
  async createLog(req, res, next) {
    try {
      const { actor, action, payload } = req.body;

      const log = await logService.createLog({
        actor,
        action,
        payload,
      });

      return res.status(201).json({
        success: true,
        message: "Log created successfully",
        data: log,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLogById(req, res, next) {
    try {
      const { id } = req.params;

      const log = await logService.getLogById(id);

      if (!log) {
        return res.status(404).json({
          success: false,
          message: "Log not found",
        });
      }

      const calculatedHash = createChainHash({
  actor: log.actor,
  action: log.action,
  payload: log.payload,
  previousHash: log.previousHash,
});

const chainVerification =
  calculatedHash === log.hash
    ? "PASS"
    : "FAIL";

      return res.json({
        success: true,
        data: {
          ...log,
          chainVerification,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LogController();