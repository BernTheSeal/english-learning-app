import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string): string => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return accessToken;
};
