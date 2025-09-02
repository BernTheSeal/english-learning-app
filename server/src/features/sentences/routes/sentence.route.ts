import express, { RequestHandler } from "express";
import { createSentence } from "../controllers/sentence.controllar";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createSentenceBodySchema } from "../schemas/sentence.schema";

import { checkAccessToken } from "../../../middlewares/checkAccessToken";

const router = express.Router();

router.post(
  "/",
  checkAccessToken,
  validateRequest({ body: createSentenceBodySchema }),
  createSentence as unknown as RequestHandler
);

export default router;
