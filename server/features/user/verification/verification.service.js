import HTTP_STATUS from "../../../config/httpStatus.js";

import UserError from "../user.error.js";

import { generateVerifyEmailToken } from "../../../shared/token/index.js";

import userRepository from "../user.repository.js";
import userTokenRepository from "../../userToken/userToken.repository.js";

const createVerificationToken = async ({ userId }) => {
  const user = await userRepository.getById(userId);
  if (user.isVerified) {
    throw new UserError("Account is already verified.", HTTP_STATUS.BAD_REQUEST);
  }

  const { token, expiresAt, type } = generateVerifyEmailToken();

  const isTokenExists = await userTokenRepository.existsByUserIdAndType(userId, type);
  if (isTokenExists) {
    await userTokenRepository.deleteByUserIdAndType(userId, type);
  }

  await userTokenRepository.create({
    userId: user._id,
    token,
    expiresAt,
    type,
  });

  return token;
};

const verifyEmail = async ({ token, userId }) => {
  const type = "VERIFY_EMAIL";

  const verifyEmailToken = await userTokenRepository.getByUserIdAndType(userId, type);

  if (
    !verifyEmailToken ||
    verifyEmailToken.token !== token ||
    verifyEmailToken.expiresAt < Date.now()
  ) {
    throw new UserError(
      "The verification code is invalid or has expired. Please request a new one.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await userTokenRepository.deleteByUserIdAndType(userId, type);

  await userRepository.updateById(userId, { isVerified: true });
};

export default { createVerificationToken, verifyEmail };
