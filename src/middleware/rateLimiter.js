import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,

  max: Number(process.env.RATE_LIMIT_MAX || 100),

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export default rateLimiter;