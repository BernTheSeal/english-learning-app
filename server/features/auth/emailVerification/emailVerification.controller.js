import HTTP_STATUS from "../../../config/httpStatus.js";
import { sendSuccessResponse } from "../../../utils/responseHelper.js";
import emailVerificationService from "./emailVerification.service.js";

export const sendVerificationCode = async (req, res, next) => {
  const user = req.user;
  try {
    await emailVerificationService.sendVerificationCode(user);

    return sendSuccessResponse(
      res,
      "A verification code has been sent to your email. Please check your inbox.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
export const verifyCode = async (req, res, next) => {
  const { code } = req.body;
  const user = req.user;
  try {
    await emailVerificationService.verifyCode({ code, user });

    return sendSuccessResponse(
      res,
      "Verification successful. Your account is now verified.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
