import express from "express";

import { withValidation } from "../../../validators/withValidation.js";
import { whitelistFields } from "../../../middlewares/whiteListFields.js";
import { authGuard } from "../../../middlewares/authGuard.js";
import { checkFullAccess } from "../../../middlewares/checkFullAccess.js";

import { getUsers, getUserById, getMe } from "./query.controller.js";

import queryValidation from "./query.validation.js";
import { checkAccessToken } from "../../../middlewares/checkAccessToken.js";

const router = express.Router();

router.get(
  "/",
  authGuard("user:read"),
  whitelistFields({ isVerified: "query", role: "query" }),
  withValidation(queryValidation.get),
  getUsers
);

router.get("/me", checkAccessToken, getMe);

router.get(
  "/:userId",
  authGuard("user:read:id"),
  checkFullAccess("admin"),
  whitelistFields({ userId: "params" }),
  withValidation(queryValidation.getById),
  getUserById
);

export default router;
