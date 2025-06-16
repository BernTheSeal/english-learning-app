import HTTP_STATUS from "../../../config/httpStatus.js";
import { sendSuccessResponse } from "../../../utils/responseHelper.js";

import passwordService from "./password.service.js";

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    await passwordService.forgotPassword(email);
    return sendSuccessResponse(
      res,
      "Password reset link has been sent to your email. Please check your inbox.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    await passwordService.resetPassword({ token, password });

    return sendSuccessResponse(
      res,
      "Password reset successfully. You can now log in with your new password.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { prevPassword, password, confirmPassword } = req.body;
  const userId = req.user._id;
  try {
    await passwordService.changePassword({
      prevPassword,
      password,
      confirmPassword,
      userId,
    });
    return sendSuccessResponse(
      res,
      "Password has been changed successfully.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
