import express from "express";

import { withValidation } from "../../../validators/withValidation.js";
import { whitelistFields } from "../../../middlewares/whiteListFields.js";
import { authGuard } from "../../../middlewares/authGuard.js";
import { checkFullAccess } from "../../../middlewares/checkFullAccess.js";
import { registerLimiter } from "../../../middlewares/rateLimiter.js";

import { register, deleteUser } from "./account.controller.js";

import accountValidation from "./account.validation.js";

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  whitelistFields({ email: "body", username: "body", password: "body" }),
  withValidation(accountValidation.register),
  register
);

router.delete(
  "/:userId",
  authGuard("user:delete:id"),
  checkFullAccess("admin"),
  whitelistFields({ userId: "params" }),
  withValidation(accountValidation.deleteById),
  deleteUser
);

export default router;
