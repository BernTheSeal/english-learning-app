import rateLimit from "express-rate-limit";
import { sendErrorResponse } from "../utils/responseHelper.js";

const createRateLimiter = (windowMinutes, maxRequests, message) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    handler: (req, res, next) => {
      return sendErrorResponse(res, message, 429, "rate_limit_exceeded");
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

const generalLimiter = createRateLimiter(15, 100, "Too many requests, please try again in 15 minutes.");

const loginLimiter = createRateLimiter(5, 5, "Too many login attempts, please try again in 5 minutes.");

const registerLimiter = createRateLimiter(
  30,
  10,
  "Too many registration attempts, please try again in 30 minutes."
);

export { generalLimiter, loginLimiter, registerLimiter };
