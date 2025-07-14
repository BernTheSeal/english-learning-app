import { mailtrapClient, sender } from "./mailtrap.config";
import { VERIFICATION_EMAIL_TEMPLATE, FORGOT_PASSWORD_EMAIL_TEMPLATE } from "./emailsTemplate";

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
    console.error("Error sending verification", error);
    throw new Error(`Error sending verification email: ${error}`);
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
    console.error("Error reseting passowrd", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};
