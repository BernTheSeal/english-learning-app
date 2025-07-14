import express, { RequestHandler } from "express";

import { authGuard } from "../../middlewares/authGuard";
import { validateRequest } from "../../middlewares/validateRequest";

import {
  getPermissions,
  getPermissionById,
  createPermission,
  deletePermission,
  updatePermission,
} from "./permission.controller";

import {
  createPermissionSchema,
  deletePermissionSchema,
  updatePermissionSchema,
  getPermissionByIdSchema,
  getPermissionsSchema,
} from "./permission.schema";

const router = express.Router();

router.get(
  "/",
  validateRequest({ query: getPermissionsSchema }),
  authGuard("permission:read"),
  getPermissions as unknown as RequestHandler
);

router.get(
  "/:permissionId",
  validateRequest({ params: getPermissionByIdSchema }),
  authGuard("permission:read:id"),
  getPermissionById as unknown as RequestHandler
);

router.post(
  "/",
  validateRequest({ body: createPermissionSchema }),
  authGuard("permission:create"),
  createPermission as unknown as RequestHandler
);

router.delete(
  "/:permissionId",
  validateRequest({ params: deletePermissionSchema }),
  authGuard("permission:delete:id"),
  deletePermission as unknown as RequestHandler
);

router.patch(
  "/:permissionId",
  validateRequest({ body: updatePermissionSchema, params: getPermissionByIdSchema }),
  authGuard("permission:update:id"),
  updatePermission as unknown as RequestHandler
);

export default router;
