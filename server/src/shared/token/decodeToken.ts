import jwt from "jsonwebtoken";

export const decodeToken = (token: string): jwt.JwtPayload | null => {
  const decoded = jwt.decode(token);
  if (typeof decoded === "object" && decoded !== null) return decoded as jwt.JwtPayload;
  return null;
};
