import HTTP_STATUS from "../../config/httpStatus.js";
import { sendSuccessResponse } from "../../utils/responseHelper.js";
import sessionService from "./session.service.js";

import { generateAccessToken } from "../../shared/token/index.js";

import {
  clearAccessTokenFromCookie,
  saveAccessTokenInCookie,
} from "../../shared/cookie/index.js";

export const checkSession = async (req, res) => {
  sendSuccessResponse(res, "User authenticated successfully.", HTTP_STATUS.OK, {
    isAuth: true,
  });
};

export const createSession = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await sessionService.validateCredentials({ email, password });

    const accessToken = await sessionService.createSession({ userId: user._id });

    saveAccessTokenInCookie(res, accessToken);

    return sendSuccessResponse(res, "Successfully logged in.", HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const deleteSession = async (req, res, next) => {
  const user = req.user;

  try {
    await sessionService.deleteSession({ userId: user._id });

    clearAccessTokenFromCookie(res);

    return sendSuccessResponse(res, "Successfully logged out.", HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const generateNewAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  try {
    const userId = await sessionService.validateSession({ accessToken });

    const newAccessToken = generateAccessToken(userId);

    clearAccessTokenFromCookie(res);

    saveAccessTokenInCookie(res, newAccessToken);

    return sendSuccessResponse(res, "New access token created", HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export default { createSession, deleteSession, checkSession, generateNewAccessToken };
