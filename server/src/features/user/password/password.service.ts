import { HTTP_ERROR_STATUS } from "../../../config/httpStatus";

import UserError from "../user.error";

import { comparePassword, hashPassword } from "../../../shared/crypto/index";
import { generateResetPasswordToken } from "../../../shared/token/index";

import userRepository from "../user.repository";
import userTokenRepository from "../../userToken/userToken.repository";
import { UserDocument } from "../user.type";
import { validatePasswordInput } from "./password.input";

const validatePasswordsInputs = async ({
  prevPassword,
  password,
  confirmPassword,
  userId,
}: validatePasswordInput) => {
  const user = (await userRepository.getWithPasswordById(userId)) as UserDocument;

  if (password !== confirmPassword) {
    throw new UserError("New password and confirmation do not match.", HTTP_ERROR_STATUS.BAD_REQUEST);
  }

  const isOldPasswordCorrect = await comparePassword(prevPassword, user.password);
  if (!isOldPasswordCorrect) {
    throw new UserError("Old password is incorrect.", HTTP_ERROR_STATUS.BAD_REQUEST);
  }

  const isSamePassword = await comparePassword(password, user.password);
  if (isSamePassword) {
    throw new UserError(
      "New password cannot be the same as the old password.",
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }
};

const createResetPasswordToken = async (email: string) => {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw new UserError(
      "No account found with this email. Please check the email and try again.",
      HTTP_ERROR_STATUS.NOT_FOUND
    );
  }

  const isTokenExists = await userTokenRepository.existsByUserIdAndType(String(user._id), "RESET_PASSWORD");
  if (isTokenExists) {
    await userTokenRepository.deleteByUserIdAndType(String(user._id), "RESET_PASSWORD");
  }

  let token, expiresAt;
  let isUnique = true;
  while (isUnique) {
    const generated = generateResetPasswordToken();
    token = generated.token;
    expiresAt = generated.expiresAt;

    const result = await userTokenRepository.existsByTokenAndType(token, "RESET_PASSWORD");
    isUnique = !!result;
  }

  if (!user._id || !token || !expiresAt) {
    throw new UserError(
      "No account found with this email. Please check the email and try again.",
      HTTP_ERROR_STATUS.NOT_FOUND
    );
  }

  await userTokenRepository.create({
    userId: user._id.toString(),
    token,
    expiresAt,
    type: "RESET_PASSWORD",
  });

  return token;
};

const validateResetPasswordToken = async (token: string) => {
  const resetPasswordToken = await userTokenRepository.getByTokenAndType(token, "RESET_PASSWORD");

  if (!resetPasswordToken || resetPasswordToken.expiresAt.getTime() < Date.now()) {
    throw new UserError(
      "Invalid or expired reset password token. Please request a new reset link.",
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  const userId = resetPasswordToken.userId;

  await userTokenRepository.deleteByUserIdAndType(String(userId), "RESET_PASSWORD");

  return userId;
};

const updatePassword = async ({ userId, password }: { userId: string; password: string }) => {
  const hashedPassword = await hashPassword(password);
  await userRepository.updateUserPasswordById(userId, hashedPassword);
};

export default {
  validatePasswordsInputs,
  createResetPasswordToken,
  validateResetPasswordToken,
  updatePassword,
};
