import express, { RequestHandler } from "express";

import {
  getUserWords,
  createUserWord,
  trackUserWordActivity,
} from "./userWord.controllar";

import { validateRequest } from "../../middlewares/validateRequest";

import { createUserWordSchema, trackUserWordActivitySchema } from "./userWord.schema";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

const router = express.Router();

router.get("/", checkAccessToken, getUserWords as unknown as RequestHandler);

router.post(
  "/",
  checkAccessToken,
  validateRequest({ body: createUserWordSchema }),

  createUserWord as unknown as RequestHandler
);

router.patch(
  "/track",
  checkAccessToken,
  validateRequest({ body: trackUserWordActivitySchema }),
  trackUserWordActivity as unknown as RequestHandler
);

export default router;
