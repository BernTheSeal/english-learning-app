import express from "express";
import {
  getPermissions,
  getPermissionById,
  addPermission,
  deletePermission,
  updatePermission,
} from "../controllers/permission.controller.js";

import {
  getPermissionsValidator,
  getPermissionByIdValidator,
  addPermissionValidator,
  deletePermissionValidator,
  updatePermissionValidator,
} from "../validators/handlers/permission.validation.js";

import { authGuard } from "../middlewares/authGuard.js";
import { withValidation } from "../validators/withValidation.js";
import { whitelistFields } from "../middlewares/whiteListFields.js";

const route = express.Router();

route.get(
  "/",
  authGuard("permission:read"),
  whitelistFields({ isActive: "query", isDeleteable: "query" }),
  withValidation(getPermissionsValidator),
  getPermissions
);

route.get(
  "/:permissionId",
  authGuard("permission:read:id"),
  whitelistFields({ permissionId: "params" }),
  withValidation(getPermissionByIdValidator),
  getPermissionById
);

route.post(
  "/",
  authGuard("permission:create"),
  whitelistFields({
    name: "body",
    description: "body",
    isDeleteable: "body",
    isActive: "body",
  }),
  withValidation(addPermissionValidator),
  addPermission
);

route.delete(
  "/:permissionId",
  authGuard("permission:delete:id"),
  whitelistFields({ permissionId: "params" }),
  withValidation(deletePermissionValidator),
  deletePermission
);

route.patch(
  "/:permissionId",
  authGuard("permission:update:id"),
  whitelistFields({
    permissionId: "params",
    name: "body",
    description: "body",
    isDeleteable: "body",
    isActive: "body",
  }),
  withValidation(updatePermissionValidator),
  updatePermission
);

export default route;
