import express, { RequestHandler } from "express";

import { authGuard } from "../../middlewares/authGuard";
import { validateRequest } from "../../middlewares/validateRequest";

import { addPermissionToRole, removePermissionFromRole } from "./rolePermission.controller";
import { rolePermissionSchema } from "./rolePermission.schema";

const router = express.Router();

router.post(
  "/:roleId/permission/:permissionId",
  authGuard("role:assign-permission:id"),
  validateRequest({ params: rolePermissionSchema }),
  addPermissionToRole as unknown as RequestHandler
);

router.delete(
  "/:roleId/permission/:permissionId",
  authGuard("role:revoke-permission:id"),
  validateRequest({ params: rolePermissionSchema }),
  removePermissionFromRole as unknown as RequestHandler
);

export default router;
