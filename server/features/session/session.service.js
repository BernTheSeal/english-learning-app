import HTTP_STATUS from "../../config/httpStatus.js";

import SessionError from "./session.error.js";

import {
  generateAccessToken,
  generateRefreshToken,
  decodeToken,
} from "../../shared/token/index.js";

import { comparePassword } from "../../shared/crypto/index.js";

import sessionRepository from "./session.repository.js";
import userRepository from "../user/user.repository.js";

const validateSession = async ({ accessToken }) => {
  if (!accessToken) {
    throw new SessionError("Access token is missing.", HTTP_STATUS.UNAUTHORIZED);
  }

  const decoded = decodeToken(accessToken);
  const userId = decoded.userId;

  if (!decoded || !userId) {
    throw new SessionError("Invalid access token.", HTTP_STATUS.UNAUTHORIZED);
  }

  const session = await sessionRepository.getByUserId(userId);
  if (!session) {
    throw new SessionError(
      "Refresh token is missing or expired.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const isExpired = session.expiresAt < new Date();
  if (isExpired) {
    await sessionRepository.deleteSessionById(session._id);
    throw new SessionError(
      "Refresh token is missing or expired.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  return decoded.userId;
};

const validateCredentials = async ({ email, password }) => {
  const user = await userRepository.getWithPasswordByEmail(email);

  if (!user) {
    throw new SessionError(
      "Invalid credentials. Please check your email and password.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new SessionError(
      "Invalid credentials. Please check your email and password.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  return user;
};

const createSession = async ({ userId }) => {
  const accessToken = generateAccessToken(userId);
  const { expiresAt, refreshToken } = generateRefreshToken(userId);

  await sessionRepository.deleteByUserId(userId);
  await sessionRepository.create(userId, refreshToken, expiresAt);

  return accessToken;
};

const deleteSession = async ({ userId }) => {
  await sessionRepository.deleteByUserId(userId);
};

export default {
  validateSession,
  validateCredentials,
  createSession,
  deleteSession,
};
