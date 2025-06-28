import express from "express";

import { withValidation } from "../../../validators/withValidation.js";
import { whitelistFields } from "../../../middlewares/whiteListFields.js";
import { checkAccessToken } from "../../../middlewares/checkAccessToken.js";

import { forgotPassword, resetPassword, updatePassword } from "./password.controller.js";

import passwordValidation from "./password.validation.js";

const router = express.Router();

router.post(
  "/forgot",
  whitelistFields({ email: "body" }),
  withValidation(passwordValidation.forgotPassword),
  forgotPassword
);

router.post(
  "/reset/:token",
  whitelistFields({ token: "params", password: "body" }),
  withValidation(passwordValidation.resetPassword),
  resetPassword
);

router.post(
  "/change",
  checkAccessToken,
  whitelistFields({ prevPassword: "body", password: "body", confirmPassword: "body" }),
  withValidation(passwordValidation.changePassword),
  updatePassword
);

export default router;
