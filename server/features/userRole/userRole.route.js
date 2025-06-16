import express from "express";

import { withValidation } from "../../validators/withValidation.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";
import { authGuard } from "../../middlewares/authGuard.js";

import { addRoleToUser, removeRoleFromUser } from "./userRole.controller.js";

import userRoleValidation from "./userRole.validation.js";

const router = express.Router();

router.post(
  "/:userId/role/:roleId",
  authGuard("user:assign-role:id"),
  whitelistFields({ userId: "params", roleId: "params" }),
  withValidation(userRoleValidation.addRoleToUser),
  addRoleToUser
);

router.delete(
  "/:userId/role/:roleId",
  authGuard("user:revoke-role:id"),
  whitelistFields({ userId: "params", roleId: "params" }),
  withValidation(userRoleValidation.removeRoleFromUser),
  removeRoleFromUser
);

export default router;
