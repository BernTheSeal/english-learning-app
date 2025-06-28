import HTTP_STATUS from "../../../config/httpStatus.js";

import UserError from "../user.error.js";

import { comparePassword, hashPassword } from "../../../shared/crypto/index.js";
import { generateResetPasswordToken } from "../../../shared/token/index.js";

import userRepository from "../user.repository.js";
import userTokenRepository from "../../userToken/userToken.repository.js";

const type = "RESET_PASSWORD";

const validatePasswordsInputs = async ({
  prevPassword,
  password,
  confirmPassword,
  userId,
}) => {
  const user = await userRepository.getWithPasswordById(userId);

  if (password !== confirmPassword) {
    throw new UserError(
      "New password and confirmation do not match.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const isOldPasswordCorrect = await comparePassword(prevPassword, user.password);
  if (!isOldPasswordCorrect) {
    throw new UserError("Old password is incorrect.", HTTP_STATUS.BAD_REQUEST);
  }

  const isSamePassword = await comparePassword(password, user.password);
  if (isSamePassword) {
    throw new UserError(
      "New password cannot be the same as the old password.",
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

const createResetPasswordToken = async (email) => {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw new UserError(
      "No account found with this email. Please check the email and try again.",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const isTokenExists = await userTokenRepository.existsByUserIdAndType(user._id, type);
  if (isTokenExists) {
    await userTokenRepository.deleteByUserIdAndType(user._id, type);
  }

  let token, expiresAt;
  let isUnique = true;
  while (isUnique) {
    const generated = generateResetPasswordToken();
    token = generated.token;
    expiresAt = generated.expiresAt;

    isUnique = await userTokenRepository.existsByTokenAndType(token, type);
  }

  await userTokenRepository.create({
    userId: user._id,
    token,
    expiresAt,
    type,
  });

  return token;
};

const validateResetPasswordToken = async (token) => {
  const resetPasswordToken = await userTokenRepository.getByTokenAndType(token, type);

  if (!resetPasswordToken || resetPasswordToken.expiresAt < Date.now()) {
    throw new UserError(
      "Invalid or expired reset password token. Please request a new reset link.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const userId = resetPasswordToken.userId;

  await userTokenRepository.deleteByUserIdAndType(userId, type);

  return userId;
};

const updatePassword = async ({ userId, password }) => {
  const hashedPassword = await hashPassword(password);
  await userRepository.updateUserPasswordById(userId, hashedPassword);
};

export default {
  validatePasswordsInputs,
  createResetPasswordToken,
  validateResetPasswordToken,
  updatePassword,
};
