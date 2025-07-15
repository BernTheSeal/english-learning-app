import express, { RequestHandler } from "express";

import { validateRequest } from "../../../middlewares/validateRequest";
import { authGuard } from "../../../middlewares/authGuard";

import { getUsers, getUserById, getMe } from "./query.controller";

import { checkAccessToken } from "../../../middlewares/checkAccessToken";
import { getUserByIdSchema, getUsersSchema } from "./query.schema";

const router = express.Router();

router.get(
  "/",
  authGuard("user:read"),
  validateRequest({ query: getUsersSchema }),
  getUsers as unknown as RequestHandler
);

router.get("/me", checkAccessToken, getMe);

router.get(
  "/:userId",
  authGuard("user:read:id"),
  validateRequest({ params: getUserByIdSchema }),
  getUserById as unknown as RequestHandler
);

export default router;
