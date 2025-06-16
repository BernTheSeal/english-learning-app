import express from "express";

import { authGuard } from "../../middlewares/authGuard.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";
import { withValidation } from "../../validators/withValidation.js";

import {
  addPermissionToRole,
  removePermissionFromRole,
} from "./rolePermission.controller.js";

import roleValidation from "./rolePermission.validation.js";

const router = express.Router();

router.post(
  "/:roleId/permission/:permissionId",
  authGuard("role:assign-permission:id"),
  whitelistFields({
    roleId: "params",
    permissionId: "params",
  }),
  withValidation(roleValidation.addPermissionToRole),
  addPermissionToRole
);

router.delete(
  "/:roleId/permission/:permissionId",
  authGuard("role:revoke-permission:id"),
  whitelistFields({
    roleId: "params",
    permissionId: "params",
  }),
  withValidation(roleValidation.removePermissionFromRole),
  removePermissionFromRole
);

export default router;
