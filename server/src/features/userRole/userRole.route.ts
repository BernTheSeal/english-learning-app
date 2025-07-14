import express, { RequestHandler } from "express";

import { validateRequest } from "../../middlewares/validateRequest";
import { authGuard } from "../../middlewares/authGuard";

import { addRoleToUser, removeRoleFromUser } from "./userRole.controller";
import { userRoleSchema } from "./userRole.schema";

const router = express.Router();

router.post(
  "/:userId/role/:roleId",
  authGuard("user:assign-role:id"),
  validateRequest({ params: userRoleSchema }),
  addRoleToUser as unknown as RequestHandler
);

router.delete(
  "/:userId/role/:roleId",
  authGuard("user:revoke-role:id"),
  validateRequest({ params: userRoleSchema }),
  removeRoleFromUser as unknown as RequestHandler
);

export default router;
