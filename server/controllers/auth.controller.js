import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateAccessTokenAndSetCookie } from "../utils/generateAccessTokenAndSetCookie.js";
import { generateRefreshTokenAndSaveToDb } from "../utils/generateRefreshTokenAndSaveToDb.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../mail/emails.js";
import AuthError from "../errors/authError.js";
import TokenError from "../errors/tokenError.js";
import { RefreshToken } from "../models/refreshToken.model.js";
import { sendSuccessResponse } from "../utils/responseHelper.js";
import HTTP_STATUS from "../config/httpStatus.js";
import { Role } from "../models/role.model.js";
import { UserRole } from "../models/userRole.model.js";

export const checkAuth = async (req, res, next) => {
  const user = req.user;
  try {
    sendSuccessResponse(res, "User authenticated successfully.", HTTP_STATUS.OK, {
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new AuthError(
        "User already exists with this email address.",
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, username });
    await user.save();

    const role = await Role.findOne({ name: "user" });
    if (!role) {
      throw new AuthError("");
    }
    const userRole = new UserRole({
      userId: user._id,
      roleId: role._id,
    });
    await userRole.save();

    return sendSuccessResponse(res, "User successfully created", HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AuthError(
        "Invalid credentials. Please check your email and password.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthError(
        "Invalid credentials. Please check your email and password.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    generateAccessTokenAndSetCookie(res, user._id);
    generateRefreshTokenAndSaveToDb(user._id);
    user.lastLogin = new Date();
    await user.save();

    return sendSuccessResponse(res, "Successfully logged in.", HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const user = req.user;

  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    await RefreshToken.deleteMany({ userId: user._id });
    return sendSuccessResponse(res, "Successfully logged out.", HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const generateNewAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new TokenError("Access token is missing.", HTTP_STATUS.UNAUTHORIZED);
    }

    const decoded = jwt.decode(accessToken);
    if (!decoded || !decoded.userId) {
      throw new TokenError("Invalid access token.", HTTP_STATUS.UNAUTHORIZED);
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const refreshDoc = await RefreshToken.findOne({ userId: decoded.userId });
    if (!refreshDoc) {
      throw new AuthError(
        "Refresh token is missing or expired.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isExpired = refreshDoc.expiresAt < new Date();
    if (isExpired) {
      await RefreshToken.deleteOne({ _id: refreshDoc._id });
      throw new AuthError(
        "Refresh token is missing or expired.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    generateAccessTokenAndSetCookie(res, decoded.userId);

    return sendSuccessResponse(res, "New access token created", HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const sendVerificationCode = async (req, res, next) => {
  const user = req.user;
  try {
    if (user.isVerified) {
      throw new AuthError("Account is already verified.", HTTP_STATUS.BAD_REQUEST);
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = verificationTokenExpiresAt;
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    return sendSuccessResponse(
      res,
      "A verification code has been sent to your email. Please check your inbox.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const verifyCode = async (req, res, next) => {
  const { code } = req.body;
  const user = req.user;
  try {
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

    return sendSuccessResponse(
      res,
      "Verification successful. Your account is now verified.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
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

    return sendSuccessResponse(
      res,
      "Password reset link has been sent to your email. Please check your inbox.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
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

    return sendSuccessResponse(
      res,
      "Password reset successfully. You can now log in with your new password.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { prevPassword, password, passwordConfirm } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (password !== passwordConfirm) {
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

    return sendSuccessResponse(
      res,
      "Password has been changed successfully.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
