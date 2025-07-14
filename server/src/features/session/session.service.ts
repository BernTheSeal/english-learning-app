import { HTTP_ERROR_STATUS } from "../../config/httpStatus";

import SessionError from "./session.error";

import { generateAccessToken, generateRefreshToken, decodeToken } from "../../shared/token/index";

import { comparePassword } from "../../shared/crypto/index";

import sessionRepository from "./session.repository";
import userRepository from "../user/user.repository";

const validateSession = async (accessToken: string) => {
  if (!accessToken) {
    throw new SessionError("Access token is missing.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  const decoded = decodeToken(accessToken);

  if (!decoded) {
    throw new SessionError("Invalid access token.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  const userId = decoded.userId;

  if (!userId) {
    throw new SessionError("Invalid access token.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  const session = await sessionRepository.getByUserId(userId);
  if (!session) {
    throw new SessionError("Refresh token is missing or expired.", HTTP_ERROR_STATUS.UNAUTHORIZED);
  }

  const isExpired = session.expiresAt < new Date();

  if (isExpired) {
    await sessionRepository.deleteByUserId(userId);
    throw new SessionError("Refresh token is missing or expired.", HTTP_ERROR_STATUS.UNAUTHORIZED);
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

  return user;
};

const createSession = async (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const { expiresAt, refreshToken } = generateRefreshToken(userId);

  await sessionRepository.deleteByUserId(userId);
  await sessionRepository.create(userId, refreshToken, expiresAt);

  return accessToken;
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
