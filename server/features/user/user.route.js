import express from "express";

import { withValidation } from "../../validators/withValidation.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";
import { authGuard } from "../../middlewares/authGuard.js";
import { checkFullAccess } from "../../middlewares/checkFullAccess.js";

import { getUsers, getUserById, deleteUser } from "./user.controller.js";

import userValidation from "./user.validation.js";

const router = express.Router();

router.get(
  "/",
  authGuard("user:read"),
  whitelistFields({ isVerified: "query", role: "query" }),
  withValidation(userValidation.getUsers),
  getUsers
);

router.get(
  "/:userId",
  authGuard("user:read:id"),
  checkFullAccess("admin"),
  whitelistFields({ userId: "params" }),
  withValidation(userValidation.getUserById),
  getUserById
);

router.delete(
  "/:userId",
  authGuard("user:delete:id"),
  checkFullAccess("admin"),
  whitelistFields({ userId: "params" }),
  withValidation(userValidation.deleteUser),
  deleteUser
);

export default router;
