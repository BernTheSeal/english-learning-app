import rateLimit from "express-rate-limit";
import { sendErrorResponse } from "../shared/response";
import { HTTP_ERROR_STATUS } from "../config/httpStatus";
import { ERROR_CATEGORY } from "../config/errorCategory";

const createRateLimiter = (windowMinutes: number, maxRequests: number, message: string) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    handler: (req, res, next) => {
      return sendErrorResponse(res, message, HTTP_ERROR_STATUS.TOO_MANY_REQUESTS, ERROR_CATEGORY.RATE);
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
