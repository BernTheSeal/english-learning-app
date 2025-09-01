import express, { RequestHandler } from "express";

import { validateRequest } from "../../../middlewares/validateRequest";
import { authGuard } from "../../../middlewares/authGuard";
import { registerLimiter } from "../../../middlewares/rateLimiter";

import { createUser, deleteUser } from "./account.controller";
import { createUserSchema, deleteUserSchema } from "./account.schema";

const router = express.Router();

router.post(
  "/",
  registerLimiter,
  validateRequest({ body: createUserSchema }),
  createUser as unknown as RequestHandler
);

router.delete(
  "/:userId",
  authGuard("user:delete:id"),
  validateRequest({ params: deleteUserSchema }),
  deleteUser as unknown as RequestHandler
);

export default router;
