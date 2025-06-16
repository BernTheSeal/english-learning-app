import express from "express";

import { checkToken } from "../../../middlewares/checkToken.js";
import { whitelistFields } from "../../../middlewares/whiteListFields.js";
import { withValidation } from "../../../validators/withValidation.js";

import emailVerificationValidation from "./emailVerification.validation.js";

import { sendVerificationCode, verifyCode } from "./emailVerification.controller.js";

const router = express.Router();

router.post("/send", checkToken, sendVerificationCode);

router.post(
  "/code",
  checkToken,
  whitelistFields({ code: "body" }),
  withValidation(emailVerificationValidation.verifyCode),
  verifyCode
);

export default router;
