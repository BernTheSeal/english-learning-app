import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { sendSuccessResponse } from "../../shared/response/sendSuccessResponse";
import sessionService from "./session.service";

import { generateAccessToken } from "../../shared/token/index";

import {
  saveSessionTokenInCookie,
  clearSessionTokenFromCookie,
} from "../../shared/cookie/index";

import { CreateSessionHandler } from "./session.handler";
import { Handler } from "express";

export const checkSession: Handler = async (req, res) => {
  sendSuccessResponse(res, "User authenticated successfully.", HTTP_SUCCESS_STATUS.OK, {
    isAuth: true,
  });
  return;
};

export const createSession: CreateSessionHandler = async (req, res, next) => {
  const { email, password } = req.validatedBody;
  try {
    const userId = await sessionService.validateCredentials(email, password);

    const { accessToken, refreshToken } = await sessionService.createSession(
      userId.toString()
    );

    saveSessionTokenInCookie(res, accessToken, "accessToken");
    saveSessionTokenInCookie(res, refreshToken, "refreshToken");

    sendSuccessResponse(res, "Successfully logged in.", HTTP_SUCCESS_STATUS.OK);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteSession: Handler = async (req, res, next) => {
  const userId = req.userId!;

  try {
    await sessionService.deleteSession(userId);

    clearSessionTokenFromCookie(res, "accessToken");
    clearSessionTokenFromCookie(res, "refreshToken");

    sendSuccessResponse(res, "Successfully logged out.", HTTP_SUCCESS_STATUS.OK);
    return;
  } catch (error) {
    next(error);
  }
};

export const generateNewAccessToken: Handler = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const userId = await sessionService.validateSession(refreshToken);

    const newAccessToken = generateAccessToken(userId);

    clearSessionTokenFromCookie(res, "accessToken");
    saveSessionTokenInCookie(res, newAccessToken, "accessToken");

    sendSuccessResponse(res, "New access token created", HTTP_SUCCESS_STATUS.CREATED);
    return;
  } catch (error) {
    next(error);
  }
};

export default { createSession, deleteSession, checkSession, generateNewAccessToken };
