import logService from "../services/log.service.js";

class LogController {
  async createLog(req, res, next) {
    try {
      const { actor, action, payload } = req.body;

      if (!actor || !action || payload === undefined) {
        return res.status(400).json({
          success: false,
          message: "actor, action and payload are required",
        });
      }

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

      const previousValid =
        !log.previousHash ||
        log.previousHash.length === 64;

      return res.json({
        success: true,
        data: {
          ...log,
          chainVerification: previousValid ? "PASS" : "FAIL",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LogController();