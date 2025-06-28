import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};
