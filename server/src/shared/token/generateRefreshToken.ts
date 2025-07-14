import jwt from "jsonwebtoken";

export const generateRefreshToken = (
  userId: string
): {
  refreshToken: string;
  expiresAt: Date;
} => {
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "14d",
  });
  return { expiresAt, refreshToken };
};
