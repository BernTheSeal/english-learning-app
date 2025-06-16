import crypto from "crypto";
import bcrypt from "bcryptjs";

import HTTP_STATUS from "../../../config/httpStatus.js";
import AuthError from "../../../errors/authError.js";

import { sendPasswordResetEmail } from "../../../mail/emails.js";

import { User } from "../../user/user.model.js";

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthError(
      "No account found with this email. Please check the email and try again.",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = resetTokenExpiresAt;
  await user.save();

  await sendPasswordResetEmail(
    user.email,
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`
  );
};

const resetPassword = async ({ token, password }) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    throw new AuthError(
      "Invalid or expired reset token. Please request a new reset link.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();
};

const changePassword = async ({ prevPassword, password, confirmPassword, userId }) => {
  const user = await User.findById(userId).select("+password");
  if (password !== confirmPassword) {
    throw new AuthError(
      "New password and confirmation do not match.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const isOldPasswordCorrect = await bcrypt.compare(prevPassword, user.password);
  if (!isOldPasswordCorrect) {
    throw new AuthError("Old password is incorrect.", HTTP_STATUS.BAD_REQUEST);
  }

  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    throw new AuthError(
      "New password cannot be the same as the old password.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const hanshedNewPassword = await bcrypt.hash(password, 10);
  user.password = hanshedNewPassword;
  await user.save();
};

export default { forgotPassword, resetPassword, changePassword };
