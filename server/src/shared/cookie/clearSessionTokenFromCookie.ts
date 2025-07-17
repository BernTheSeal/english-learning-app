import { Response } from "express";

export const clearSessionTokenFromCookie = (
  res: Response,
  tokenName: "accessToken" | "refreshToken"
): void => {
  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
