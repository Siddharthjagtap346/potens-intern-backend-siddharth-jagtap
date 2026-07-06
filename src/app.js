import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import pinoHttp from "pino-http";

import logger from "./logger/logger.js";

const app = express();

app.use(
  pinoHttp({
    logger,
  })
);

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Tamper Evident Append Only Log API",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default app;