import jwt from "jsonwebtoken";
import { User } from "../features/user/user.model.js";
import TokenError from "../errors/tokenError.js";
import SessionError from "../features/session/session.error.js";
import HTTP_STATUS from "../config/httpStatus.js";

export const checkAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  let decoded;

  try {
    if (!accessToken) {
      throw new SessionError(
        "unauthorized - no token provided.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    try {
      decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      throw new SessionError(
        "unauthorized - no token provided.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new SessionError(
        "unauthorized - no token provided.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
