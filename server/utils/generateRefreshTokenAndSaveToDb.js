import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/refreshToken.model.js";

export const generateRefreshTokenAndSaveToDb = async (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  await RefreshToken.deleteMany({ userId });

  await RefreshToken.create({
    userId,
    token: refreshToken,
    expiresAt,
  });
};
