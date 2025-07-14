import { Response } from "express";
import { SuccessStatusCode } from "../../types/StatusCode";

export const sendSuccessResponse = <T = null>(
  res: Response,
  message: string,
  statusCode: SuccessStatusCode,
  data?: T
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  });
};
