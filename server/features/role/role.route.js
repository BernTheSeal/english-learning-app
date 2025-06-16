import express from "express";

import { authGuard } from "../../middlewares/authGuard.js";
import { withValidation } from "../../validators/withValidation.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";

import {
  getRoles,
  addRole,
  deleteRole,
  updateRole,
  getRoleById,
} from "./role.controller.js";

import roleValidation from "./role.validation.js";

const router = express.Router();

router.get(
  "/",
  authGuard("role:read"),
  whitelistFields({ isActive: "query", isDeleteable: "query" }),
  withValidation(roleValidation.getRole),
  getRoles
);

router.get(
  "/:roleId",
  authGuard("role:read:id"),
  whitelistFields({ roleId: "params" }),
  withValidation(roleValidation.getRoleById),
  getRoleById
);

router.post(
  "/",
  authGuard("role:create"),
  whitelistFields({
    name: "body",
    description: "body",
    isActive: "body",
    isDeleteable: "body",
  }),
  withValidation(roleValidation.addRole),
  addRole
);

router.delete(
  "/:roleId",
  authGuard("role:delete:id"),
  whitelistFields({
    roleId: "params",
  }),
  withValidation(roleValidation.deleteRole),
  deleteRole
);

router.patch(
  "/:roleId",
  authGuard("role:update:id"),
  whitelistFields({
    roleId: "params",
    name: "body",
    description: "body",
    isActive: "body",
    isDeleteable: "body",
  }),
  withValidation(roleValidation.updateRole),
  updateRole
);

export default router;
