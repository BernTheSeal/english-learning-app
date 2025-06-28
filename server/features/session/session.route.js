import express from "express";

import {
  createSession,
  deleteSession,
  checkSession,
  generateNewAccessToken,
} from "./session.controller.js";

import { checkAccessToken } from "../../middlewares/checkAccessToken.js";
import { loginLimiter } from "../../middlewares/rateLimiter.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";
import { withValidation } from "../../validators/withValidation.js";

import sessionValidation from "./session.validation.js";

const router = express.Router();

router
  .route("/")
  .get(checkAccessToken, checkSession)
  .post(
    loginLimiter,
    whitelistFields({ email: "body", password: "body" }),
    withValidation(sessionValidation.login),
    createSession
  )
  .delete(checkAccessToken, deleteSession);

router.get("/refresh", generateNewAccessToken);

export default router;
