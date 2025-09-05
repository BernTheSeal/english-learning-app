import express, { RequestHandler } from "express";
import {
  createSentence,
  deleteSentence,
  getASentence,
  getSentences,
} from "./sentence.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createSentenceBodySchema,
  deleteSentenceSchema,
  getASentenceSchema,
  getSentencesSchema,
} from "./sentence.schema";

import { checkAccessToken } from "../../middlewares/checkAccessToken";

const router = express.Router();

router.post(
  "/",
  checkAccessToken,
  validateRequest({ body: createSentenceBodySchema }),
  createSentence as unknown as RequestHandler
);

router.get(
  "/:sentenceId",
  validateRequest({ params: getASentenceSchema }),
  getASentence as unknown as RequestHandler
);

router.get(
  "/",
  checkAccessToken,
  validateRequest({ query: getSentencesSchema }),
  getSentences as unknown as RequestHandler
);

router.delete(
  "/:sentenceId",
  checkAccessToken,
  validateRequest({ params: deleteSentenceSchema }),
  deleteSentence as unknown as RequestHandler
);

export default router;
