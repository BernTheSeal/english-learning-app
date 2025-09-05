import express, { RequestHandler } from "express";
import { toggleSentenceLike } from "./sentenceLike.controller";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  toggleSenteceLikeBodySchema,
  toggleSentenceLikeParamsSchema,
} from "./sentenceLike.schema";

const router = express.Router();

router.post(
  "/:sentenceId",
  checkAccessToken,
  validateRequest({
    body: toggleSenteceLikeBodySchema,
    params: toggleSentenceLikeParamsSchema,
  }),
  toggleSentenceLike as unknown as RequestHandler
);

export default router;
