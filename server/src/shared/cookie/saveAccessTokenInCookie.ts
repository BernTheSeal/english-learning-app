import { Response } from "express";

export const saveAccessTokenInCookie = (res: Response, accessToken: string): void => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
