import express, { RequestHandler } from "express";

import { validateRequest } from "../../../middlewares/validateRequest";
import { authGuard } from "../../../middlewares/authGuard";
import { checkFullAccess } from "../../../middlewares/checkFullAccess";
import { registerLimiter } from "../../../middlewares/rateLimiter";

import { register, deleteUser } from "./account.controller";
import { createUserSchema, deleteUserSchema } from "./account.schema";

const router = express.Router();

router.post(
  "/register",
  registerLimiter,
  validateRequest({ body: createUserSchema }),
  register as unknown as RequestHandler
);

router.delete(
  "/:userId",
  authGuard("user:delete:id"),
  validateRequest({ params: deleteUserSchema }),
  checkFullAccess("admin"),
  deleteUser as unknown as RequestHandler
);

export default router;
