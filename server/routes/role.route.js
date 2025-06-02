import express from "express";
import {
  getRoles,
  addRole,
  deleteRole,
  updateRole,
  getRoleById,
  addPermissionToRole,
  removePermissionFromRole,
} from "../controllers/role.controller.js";

import {
  getRoleValidator,
  getRoleByIdValidator,
  addRoleValidator,
  updateRoleValidator,
  deleteRoleValidator,
  addPermissionToRoleValidator,
  removePermissionFromRoleValidator,
} from "../validators/handlers/role.validation.js";

import { authGuard } from "../middlewares/authGuard.js";
import { withValidation } from "../validators/withValidation.js";
import { whitelistFields } from "../middlewares/whiteListFields.js";

const route = express.Router();

route.get(
  "/",
  authGuard("role:read"),
  whitelistFields({ isActive: "query", isDeleteable: "query" }),
  withValidation(getRoleValidator),
  getRoles
);

route.get(
  "/:roleId",
  authGuard("role:read:id"),
  whitelistFields({ roleId: "params" }),
  withValidation(getRoleByIdValidator),
  getRoleById
);

route.post(
  "/",
  authGuard("role:create"),
  whitelistFields({
    name: "body",
    description: "body",
    isActive: "body",
    isDeleteable: "body",
  }),
  withValidation(addRoleValidator),
  addRole
);

route.delete(
  "/:roleId",
  authGuard("role:delete:id"),
  whitelistFields({
    roleId: "params",
  }),
  withValidation(deleteRoleValidator),
  deleteRole
);

route.patch(
  "/:roleId",
  authGuard("role:update:id"),
  whitelistFields({
    roleId: "params",
    name: "body",
    description: "body",
    isActive: "body",
    isDeleteable: "body",
  }),
  withValidation(updateRoleValidator),
  updateRole
);

route.post(
  "/:roleId/permission/:permissionId",
  authGuard("role:assign-permission:id"),
  whitelistFields({
    roleId: "params",
    permissionId: "params",
  }),
  withValidation(addPermissionToRoleValidator),
  addPermissionToRole
);

route.delete(
  "/:roleId/permission/:permissionId",
  authGuard("role:revoke-permission:id"),
  whitelistFields({
    roleId: "params",
    permissionId: "params",
  }),
  withValidation(removePermissionFromRoleValidator),
  removePermissionFromRole
);

export default route;
