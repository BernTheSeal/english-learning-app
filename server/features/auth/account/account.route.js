import express from "express";

import { whitelistFields } from "../../../middlewares/whiteListFields.js";
import { loginLimiter, registerLimiter } from "../../../middlewares/rateLimiter.js";
import { withValidation } from "../../../validators/withValidation.js";

import { register, login } from "./account.controller.js";

import accountValidation from "./account.validation.js";

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  whitelistFields({ email: "body", username: "body", password: "body" }),
  withValidation(accountValidation.register),
  register
);

router.post(
  "/login",
  loginLimiter,
  whitelistFields({ email: "body", password: "body" }),
  withValidation(accountValidation.login),
  login
);

export default router;
