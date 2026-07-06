import { Router } from "express";
import verifyController from "../controllers/verify.controller.js";
import logController from "../controllers/log.controller.js";
import exportController from "../controllers/export.controller.js";
import { validate } from "../middleware/validate.js";
import { logSchema } from "../schemas/log.schema.js";

const router = Router();

router.post(
"/log",
validate(logSchema),
logController.createLog
);

router.get(
  "/log/:id",
  logController.getLogById
);

router.get(
  "/verify",
  verifyController.verify
);

router.get(
  "/export",
  exportController.exportLogs
);

export default router;