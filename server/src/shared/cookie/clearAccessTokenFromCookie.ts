import { Response } from "express";

export const clearAccessTokenFromCookie = (res: Response): void => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
