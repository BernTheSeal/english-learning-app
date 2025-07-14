import { Handler } from "express";
import { HTTP_SUCCESS_STATUS } from "../../../config/httpStatus";
import { sendVerificationEmail } from "../../../mail/emails";

import { sendSuccessResponse } from "../../../shared/response/sendSuccessResponse";

import verificationService from "./verification.service";
import { VerifyEmailHandler } from "./verification.handler";

export const sendVerificationToken: Handler = async (req, res, next) => {
  const userId = req.userId!;
  try {
    const { token, email } = await verificationService.createVerificationToken(userId);

    await sendVerificationEmail(email, token);

    sendSuccessResponse(
      res,
      "A verification code has been sent to your email. Please check your inbox.",
      HTTP_SUCCESS_STATUS.OK
    );
    return;
  } catch (error) {
    next(error);
  }
};

export const verifyEmail: VerifyEmailHandler = async (req, res, next) => {
  const { token } = req.validatedBody;
  const userId = req.userId!;
  try {
    await verificationService.verifyEmail({ token, userId });

    return sendSuccessResponse(
      res,
      "Verification successful. Your account is now verified.",
      HTTP_SUCCESS_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
