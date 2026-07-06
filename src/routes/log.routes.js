import { Router } from "express";
import verifyController from "../controllers/verify.controller.js";
import logController from "../controllers/log.controller.js";

const router = Router();

router.post(
  "/log",
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
export default router;