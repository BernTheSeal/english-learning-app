import express from "express";

import { authGuard } from "../../middlewares/authGuard.js";
import { withValidation } from "../../validators/withValidation.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";

import {
  getPermissions,
  getPermissionById,
  createPermission,
  deletePermission,
  updatePermission,
} from "./permission.controller.js";

import permissionValidation from "./permission.validation.js";

const router = express.Router();

router.get(
  "/",
  authGuard("permission:read"),
  whitelistFields({ isActive: "query", isDeleteable: "query" }),
  withValidation(permissionValidation.get),
  getPermissions
);

router.get(
  "/:permissionId",
  authGuard("permission:read:id"),
  whitelistFields({ permissionId: "params" }),
  withValidation(permissionValidation.getById),
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
  withValidation(permissionValidation.create),
  createPermission
);

router.delete(
  "/:permissionId",
  authGuard("permission:delete:id"),
  whitelistFields({ permissionId: "params" }),
  withValidation(permissionValidation.deleteById),
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
  withValidation(permissionValidation.updateById),
  updatePermission
);

export default router;
