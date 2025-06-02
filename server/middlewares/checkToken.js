import jwt from "jsonwebtoken";
import AuthError from "../errors/authError.js";
import { User } from "../models/user.model.js";
import TokenError from "../errors/tokenError.js";
import HTTP_STATUS from "../config/httpStatus.js";

export const checkToken = async (req, res, next) => {
  const token = req.cookies.accessToken;

  let decoded;

  try {
    if (!token) {
      throw new TokenError("unauthorized - no token provided.", HTTP_STATUS.UNAUTHORIZED);
    }
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new TokenError("unauthorized - no token provided.", HTTP_STATUS.UNAUTHORIZED);
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AuthError("User not found.", HTTP_STATUS.NOT_FOUND);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
