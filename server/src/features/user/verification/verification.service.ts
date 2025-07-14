import { HTTP_ERROR_STATUS } from "../../../config/httpStatus";
import UserError from "../user.error";
import { generateVerifyEmailToken } from "../../../shared/token/index";
import userRepository from "../user.repository";
import userTokenRepository from "../../userToken/userToken.repository";
import { verifyEmailInput } from "./verification.input";

const createVerificationToken = async (userId: string) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new UserError("User not found.", HTTP_ERROR_STATUS.BAD_REQUEST);
  }
  if (user.isVerified) {
    throw new UserError("Account is already verified.", HTTP_ERROR_STATUS.BAD_REQUEST);
  }

  const { token, expiresAt, type } = generateVerifyEmailToken();

  const isTokenExists = await userTokenRepository.existsByUserIdAndType(userId, type);
  if (isTokenExists) {
    await userTokenRepository.deleteByUserIdAndType(userId, type);
  }

  await userTokenRepository.create({
    userId: user._id.toString(),
    token,
    expiresAt,
    type,
  });

  return { token, email: user.email };
};

const verifyEmail = async ({ token, userId }: verifyEmailInput) => {
  const type = "VERIFY_EMAIL";

  const verifyEmailToken = await userTokenRepository.getByUserIdAndType(userId, type);

  if (
    !verifyEmailToken ||
    Number(verifyEmailToken.token) !== token ||
    verifyEmailToken.expiresAt.getTime() < Date.now()
  ) {
    throw new UserError(
      "The verification code is invalid or has expired. Please request a new one.",
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  await userTokenRepository.deleteByUserIdAndType(userId, type);

  await userRepository.updateById(userId, { isVerified: true });
};

export default { createVerificationToken, verifyEmail };
