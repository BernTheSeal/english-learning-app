import jwt from "jsonwebtoken";

export const verifyToken = (token: string): jwt.JwtPayload | null => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  if (typeof decoded === "object" && decoded !== null) return decoded as jwt.JwtPayload;
  return null;
};
