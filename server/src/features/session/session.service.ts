import { HTTP_ERROR_STATUS } from "../../config/httpStatus";

import SessionError from "./session.error";

import { generateAccessToken, generateRefreshToken, verifyToken } from "../../shared/token/index";

import { comparePassword } from "../../shared/crypto/index";

import sessionRepository from "./session.repository";
import userRepository from "../user/user.repository";

const validateSession = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new SessionError("refresh token is missing.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  let decoded;
  try {
    decoded = verifyToken(refreshToken);
  } catch (error) {
    throw new SessionError("Invalid refresh token.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  if (!decoded) {
    throw new SessionError("Invalid refresh token.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  const session = await sessionRepository.getByToken(refreshToken);
  if (!session) {
    throw new SessionError("Refresh token is missing", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  const isExpired = session.expiresAt < new Date();

  if (isExpired) {
    await sessionRepository.getByToken(refreshToken);
    throw new SessionError("Refresh token is expired.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  return decoded.userId;
};

const validateCredentials = async (email: string, password: string) => {
  const user = await userRepository.getWithPasswordByEmail(email);

  if (!user) {
    throw new SessionError(
      "Invalid credentials. Please check your email and password.",
      HTTP_ERROR_STATUS.UNAUTHORIZED,
      null
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new SessionError(
      "Invalid credentials. Please check your email and password.",
      HTTP_ERROR_STATUS.UNAUTHORIZED,
      null
    );
  }

  const userId = user._id;

  return userId;
};

const createSession = async (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const { expiresAt, refreshToken } = generateRefreshToken(userId);

  await sessionRepository.deleteByUserId(userId);
  await sessionRepository.create(userId, refreshToken, expiresAt);

  return { accessToken, refreshToken };
};

const deleteSession = async (userId: string) => {
  await sessionRepository.deleteByUserId(userId);
};

export default {
  validateSession,
  validateCredentials,
  createSession,
  deleteSession,
};
