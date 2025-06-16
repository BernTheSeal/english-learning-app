import HTTP_STATUS from "../../../config/httpStatus.js";
import AuthError from "../../../errors/authError.js";
import { sendVerificationEmail } from "../../../mail/emails.js";

const sendVerificationCode = async (user) => {
  if (user.isVerified) {
    throw new AuthError("Account is already verified.", HTTP_STATUS.BAD_REQUEST);
  }

  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
  user.verificationToken = verificationToken;
  user.verificationTokenExpiresAt = verificationTokenExpiresAt;
  await user.save();

  await sendVerificationEmail(user.email, verificationToken);
};

const verifyCode = async ({ code, user }) => {
  if (user.verificationToken !== code) {
    throw new AuthError(
      "Verification code is invalid or has expired.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (Date.now() > user.verificationTokenExpiresAt) {
    throw new AuthError(
      "Verification code is invalid or has expired.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();
};

export default { sendVerificationCode, verifyCode };
