import HTTP_STATUS from "../../../config/httpStatus.js";
import TokenError from "../../../errors/tokenError.js";
import AuthError from "../../../errors/authError.js";
import jwt from "jsonwebtoken";

import { RefreshToken } from "./refreshToken.model.js";

const validateAccessAndRefreshToken = async ({ accessToken }) => {
  if (!accessToken) {
    throw new TokenError("Access token is missing.", HTTP_STATUS.UNAUTHORIZED);
  }

  const decoded = jwt.decode(accessToken);
  if (!decoded || !decoded.userId) {
    throw new TokenError("Invalid access token.", HTTP_STATUS.UNAUTHORIZED);
  }

  const refreshDoc = await RefreshToken.findOne({ userId: decoded.userId });
  if (!refreshDoc) {
    throw new AuthError("Refresh token is missing or expired.", HTTP_STATUS.UNAUTHORIZED);
  }

  const isExpired = refreshDoc.expiresAt < new Date();
  if (isExpired) {
    await RefreshToken.deleteOne({ _id: refreshDoc._id });
    throw new AuthError("Refresh token is missing or expired.", HTTP_STATUS.UNAUTHORIZED);
  }

  return decoded.userId;
};

const logout = async (user) => {
  await RefreshToken.deleteMany({ userId: user._id });
};

export default { validateAccessAndRefreshToken, logout };
