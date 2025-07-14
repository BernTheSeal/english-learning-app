import express, { RequestHandler } from "express";

import { authGuard } from "../../middlewares/authGuard";

import { validateRequest } from "../../middlewares/validateRequest";

import { getRoles, createRole, deleteRole, updateRole, getRoleById } from "./role.controller";

import {
  createRoleSchema,
  deleteRoleSchema,
  getRoleByIdSchema,
  getRolesSchema,
  updateRoleSchema,
} from "./role.schema";

const router = express.Router();

router.get(
  "/",
  authGuard("role:read"),
  validateRequest({ query: getRolesSchema }),
  getRoles as unknown as RequestHandler
);

router.get(
  "/:roleId",
  authGuard("role:read:id"),
  validateRequest({ params: getRoleByIdSchema }),
  getRoleById as unknown as RequestHandler
);

router.post(
  "/",
  authGuard("role:create"),
  validateRequest({ body: createRoleSchema }),
  createRole as unknown as RequestHandler
);

router.delete(
  "/:roleId",
  authGuard("role:delete:id"),
  validateRequest({ params: deleteRoleSchema }),
  deleteRole as unknown as RequestHandler
);

router.patch(
  "/:roleId",
  authGuard("role:update:id"),
  validateRequest({ body: updateRoleSchema, params: getRoleByIdSchema }),
  updateRole as unknown as RequestHandler
);

export default router;
