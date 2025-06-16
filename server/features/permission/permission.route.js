import express from "express";

import { authGuard } from "../../middlewares/authGuard.js";
import { withValidation } from "../../validators/withValidation.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";

import {
  getPermissions,
  getPermissionById,
  addPermission,
  deletePermission,
  updatePermission,
} from "./permission.controller.js";

import permissionValidation from "./permission.validation.js";

const router = express.Router();

router.get(
  "/",
  authGuard("permission:read"),
  whitelistFields({ isActive: "query", isDeleteable: "query" }),
  withValidation(permissionValidation.getPermissions),
  getPermissions
);

router.get(
  "/:permissionId",
  authGuard("permission:read:id"),
  whitelistFields({ permissionId: "params" }),
  withValidation(permissionValidation.getPermissionById),
  getPermissionById
);

router.post(
  "/",
  authGuard("permission:create"),
  whitelistFields({
    name: "body",
    description: "body",
    isDeleteable: "body",
    isActive: "body",
  }),
  withValidation(permissionValidation.addPermission),
  addPermission
);

router.delete(
  "/:permissionId",
  authGuard("permission:delete:id"),
  whitelistFields({ permissionId: "params" }),
  withValidation(permissionValidation.deletePermission),
  deletePermission
);

router.patch(
  "/:permissionId",
  authGuard("permission:update:id"),
  whitelistFields({
    permissionId: "params",
    name: "body",
    description: "body",
    isDeleteable: "body",
    isActive: "body",
  }),
  withValidation(permissionValidation.updatePermission),
  updatePermission
);

export default router;
