import express from "express";
import {
  checkAuth,
  register,
  logout,
  login,
  generateNewAccessToken,
  sendVerificationCode,
  verifyCode,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/auth.controller.js";

import {
  loginValidator,
  registerValidator,
  verifyCodeValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from "../validators/handlers/auth.validation.js";

import { loginLimiter, registerLimiter } from "../middlewares/rateLimiter.js";
import { checkToken } from "../middlewares/checkToken.js";
import { withValidation } from "../validators/withValidation.js";
import { whitelistFields } from "../middlewares/whiteListFields.js";

const router = express.Router();

router.get("/check-auth", checkToken, checkAuth);

router.post(
  "/register",
  registerLimiter,
  whitelistFields({ email: "body", username: "body", password: "body" }),
  withValidation(registerValidator),
  register
);

router.post(
  "/login",
  loginLimiter,
  whitelistFields({ email: "body", password: "body" }),
  withValidation(loginValidator),
  login
);

router.post("/logout", checkToken, logout);

router.post("/generate-new-access-token", generateNewAccessToken);

router.post("/send-verification-code", checkToken, sendVerificationCode);

router.post(
  "/verify-code",
  checkToken,
  whitelistFields({ code: "body" }),
  withValidation(verifyCodeValidator),
  verifyCode
);

router.post(
  "/forgot-password",
  whitelistFields({ email: "body" }),
  withValidation(forgotPasswordValidator),
  forgotPassword
);

router.post(
  "/reset-password/:token",
  whitelistFields({ token: "params", password: "body" }),
  withValidation(resetPasswordValidator),
  resetPassword
);

router.post(
  "/change-password",
  checkToken,
  whitelistFields({ prevPassword: "body", password: "body", confirmPassword: "body" }),
  withValidation(changePasswordValidator),
  changePassword
);

export default router;
