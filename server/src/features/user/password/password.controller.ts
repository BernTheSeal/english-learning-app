import { HTTP_SUCCESS_STATUS } from "../../../config/httpStatus";
import { sendPasswordResetEmail } from "../../../mail/emails";
import { sendSuccessResponse } from "../../../shared/response/sendSuccessResponse";
import { ForgotPasswordHandler, ResetPasswordHandler, UpdatePasswordHandler } from "./password.handler";

import passwordService from "./password.service";

export const forgotPassword: ForgotPasswordHandler = async (req, res, next) => {
  const { email } = req.validatedBody;
  try {
    const resetToken = await passwordService.createResetPasswordToken(email);

    await sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    sendSuccessResponse(
      res,
      "Password reset link has been sent to your email. Please check your inbox.",
      HTTP_SUCCESS_STATUS.OK
    );
    return;
  } catch (error) {
    next(error);
  }
};

export const resetPassword: ResetPasswordHandler = async (req, res, next) => {
  const { token } = req.validatedParams;
  const { password } = req.validatedBody;
  try {
    const userId = await passwordService.validateResetPasswordToken(token);

    await passwordService.updatePassword({ userId: String(userId), password });

    sendSuccessResponse(
      res,
      "Password reset successfully. You can now log in with your new password.",
      HTTP_SUCCESS_STATUS.OK
    );

    return;
  } catch (error) {
    next(error);
  }
};

export const updatePassword: UpdatePasswordHandler = async (req, res, next) => {
  const { prevPassword, password, confirmPassword } = req.validatedBody;
  const userId = req.userId!;
  try {
    await passwordService.validatePasswordsInputs({
      prevPassword,
      password,
      confirmPassword,
      userId,
    });

    await passwordService.updatePassword({ userId, password });

    return sendSuccessResponse(res, "Password has been changed successfully.", HTTP_SUCCESS_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
