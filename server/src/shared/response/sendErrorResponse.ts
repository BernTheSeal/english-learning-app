import { Response } from "express";
import { ErrorStatusCode } from "../../types/StatusCode";
import { ErrorCategory } from "../../types/ErrorCategory";

export const sendErrorResponse = <T>(
  res: Response,
  message: string,
  statusCode: ErrorStatusCode,
  errorCategory: ErrorCategory,
  errors?: T
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    errorCategory,
    errors: errors ?? null,
  });
};
