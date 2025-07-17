import { mailtrapClient, sender } from "./mailtrap.config";
import { VERIFICATION_EMAIL_TEMPLATE, FORGOT_PASSWORD_EMAIL_TEMPLATE } from "./emailsTemplate";
import { MailError } from "./Mail.error";
import { HTTP_ERROR_STATUS } from "../config/httpStatus";

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken),
      category: "Email verification",
    });
  } catch (error) {
    throw new MailError("Error sending verification email", HTTP_ERROR_STATUS.BAD_REQUEST);
  }
};

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "reset your password",
      html: FORGOT_PASSWORD_EMAIL_TEMPLATE.replace("{resetURL}", resetURL),
      category: "forgot password",
    });
  } catch (error) {
    throw new MailError("Error sending reset password link", HTTP_ERROR_STATUS.BAD_REQUEST);
  }
};
