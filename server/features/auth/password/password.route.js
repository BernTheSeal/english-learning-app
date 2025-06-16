import express from "express";

import { whitelistFields } from "../../../middlewares/whiteListFields.js";
import { withValidation } from "../../../validators/withValidation.js";
import { checkToken } from "../../../middlewares/checkToken.js";

import { forgotPassword, resetPassword, changePassword } from "./password.controller.js";

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
  checkToken,
  whitelistFields({ prevPassword: "body", password: "body", confirmPassword: "body" }),
  withValidation(passwordValidation.changePassword),
  changePassword
);

export default router;
