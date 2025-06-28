import express from "express";

import { authGuard } from "../../middlewares/authGuard.js";
import { withValidation } from "../../validators/withValidation.js";
import { whitelistFields } from "../../middlewares/whiteListFields.js";

import {
  getRoles,
  createRole,
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
  withValidation(roleValidation.get),
  getRoles
);

router.get(
  "/:roleId",
  authGuard("role:read:id"),
  whitelistFields({ roleId: "params" }),
  withValidation(roleValidation.getById),
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
  withValidation(roleValidation.create),
  createRole
);

router.delete(
  "/:roleId",
  authGuard("role:delete:id"),
  whitelistFields({
    roleId: "params",
  }),
  withValidation(roleValidation.deleteById),
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
  withValidation(roleValidation.updateById),
  updateRole
);

export default router;
