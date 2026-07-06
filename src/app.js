import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import pinoHttp from "pino-http";

import logger from "./logger/logger.js";
import apiKeyAuth from "./middleware/auth.js";
import rateLimiter from "./middleware/rateLimiter.js";
import logRoutes from "./routes/log.routes.js";

const app = express();

// Logger
app.use(
  pinoHttp({
    logger,
  })
);

// Security
app.use(helmet());
app.use(cors());
app.use(compression());

// Body Parser
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Public Routes (No API Key Required)
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

// Protected Routes
app.use(apiKeyAuth);
app.use(rateLimiter);

// Log Routes
app.use(logRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  req.log?.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;