import HTTP_STATUS from "../../../config/httpStatus.js";
import { sendSuccessResponse } from "../../../utils/responseHelper.js";
import { generateAccessTokenAndSetCookie } from "../../../utils/generateAccessTokenAndSetCookie.js";
import sessionService from "./session.service.js";
import { clearAccessTokenFromCookie } from "../../../utils/clearAccessTokenFromCookie.js";

export const checkAuth = async (req, res, next) => {
  const user = req.user;
  try {
    sendSuccessResponse(res, "User authenticated successfully.", HTTP_STATUS.OK, {
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const generateNewAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  try {
    const userId = await sessionService.validateAccessAndRefreshToken({ accessToken });

    clearAccessTokenFromCookie(res);
    generateAccessTokenAndSetCookie(res, userId);
    return sendSuccessResponse(res, "New access token created", HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const user = req.user;

  try {
    clearAccessTokenFromCookie(res);
    await sessionService.logout(user);

    return sendSuccessResponse(res, "Successfully logged out.", HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
