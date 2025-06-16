import HTTP_STATUS from "../../../config/httpStatus.js";
import accountService from "./account.service.js";
import { sendSuccessResponse } from "../../../utils/responseHelper.js";

import { generateAccessTokenAndSetCookie } from "../../../utils/generateAccessTokenAndSetCookie.js";
import { generateRefreshTokenAndSaveToDb } from "../../../utils/generateRefreshTokenAndSaveToDb.js";

export const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    await accountService.register({ email, password, username });
    return sendSuccessResponse(res, "User successfully created", HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await accountService.login({ email, password });
    generateAccessTokenAndSetCookie(res, user._id);
    generateRefreshTokenAndSaveToDb(user._id);

    return sendSuccessResponse(res, "Successfully logged in.", HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
