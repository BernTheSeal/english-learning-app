import HTTP_STATUS from "../../../config/httpStatus.js";

import { sendPasswordResetEmail } from "../../../mail/emails.js";
import { sendSuccessResponse } from "../../../utils/responseHelper.js";

import passwordService from "./password.service.js";

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const resetToken = await passwordService.createResetPasswordToken(email);

    await sendPasswordResetEmail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

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
    const userId = await passwordService.validateResetPasswordToken(token);

    await passwordService.updatePassword({ userId, password });

    return sendSuccessResponse(
      res,
      "Password reset successfully. You can now log in with your new password.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  const { prevPassword, password, confirmPassword } = req.body;
  const userId = req.user._id;
  try {
    await passwordService.validatePasswordsInputs({
      prevPassword,
      password,
      confirmPassword,
      userId,
    });

    await passwordService.updatePassword({ userId, password });

    return sendSuccessResponse(
      res,
      "Password has been changed successfully.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
