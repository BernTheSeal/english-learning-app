import express from "express";

import { checkAccessToken } from "../../../middlewares/checkAccessToken.js";
import { whitelistFields } from "../../../middlewares/whiteListFields.js";
import { withValidation } from "../../../validators/withValidation.js";

import verificationValidation from "./verification.validation.js";

import { sendVerificationToken, verifyEmail } from "./verification.controller.js";

const router = express.Router();

router.post("/send", checkAccessToken, sendVerificationToken);

router.post(
  "/code",
  checkAccessToken,
  whitelistFields({ token: "body" }),
  withValidation(verificationValidation.verifyEmail),
  verifyEmail
);

export default router;
