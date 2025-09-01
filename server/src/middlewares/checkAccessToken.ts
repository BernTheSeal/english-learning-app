import jwt from "jsonwebtoken";
import SessionError from "../features/session/session.error";
import { HTTP_ERROR_STATUS } from "../config/httpStatus";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../shared/token";

export const checkAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken: string = req.cookies.accessToken;

  try {
    if (!accessToken) {
      throw new SessionError("there is no token", HTTP_ERROR_STATUS.UNAUTHORIZED);
    }
    let decoded;

    try {
      decoded = verifyToken(accessToken);
    } catch (error) {
      throw new SessionError("Invalid token payload", HTTP_ERROR_STATUS.UNAUTHORIZED);
    }

    if (typeof decoded !== "object" || decoded === null || !("userId" in decoded)) {
      throw new SessionError("Invalid token payload", HTTP_ERROR_STATUS.UNAUTHORIZED);
    }

    if (!decoded.userId) {
      throw new SessionError("Invalid token payload", HTTP_ERROR_STATUS.UNAUTHORIZED);
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};
