import exportService from "../services/export.service.js";

class ExportController {
  async exportLogs(req, res, next) {
    try {
      const { actor, from, to } = req.query;

      const data = await exportService.exportLogs({
        actor,
        from,
        to,
      });

      return res.json({
        success: true,
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ExportController();