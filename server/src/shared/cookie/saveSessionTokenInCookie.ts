import { Response } from "express";

export const saveSessionTokenInCookie = (
  res: Response,
  token: string,
  tokenName: "accessToken" | "refreshToken"
): void => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
