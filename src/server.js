import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import logger from "./logger/logger.js";

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
  });
}

export default app;