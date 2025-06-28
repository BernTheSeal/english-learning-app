import HTTP_STATUS from "../../../config/httpStatus.js";
import { sendVerificationEmail } from "../../../mail/emails.js";

import { sendSuccessResponse } from "../../../utils/responseHelper.js";

import verificationService from "./verification.service.js";

export const sendVerificationToken = async (req, res, next) => {
  const user = req.user;
  try {
    const verificationToken = await verificationService.createVerificationToken({
      userId: user._id,
    });

    await sendVerificationEmail(user.email, verificationToken);

    return sendSuccessResponse(
      res,
      "A verification code has been sent to your email. Please check your inbox.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.body;
  const user = req.user;
  try {
    await verificationService.verifyEmail({ token, userId: user._id });

    return sendSuccessResponse(
      res,
      "Verification successful. Your account is now verified.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
