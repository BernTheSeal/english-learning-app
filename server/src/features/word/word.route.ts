import express, { RequestHandler } from "express";

import { toggleWordFrequency } from "./word.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createWordFrequencySchema, getWordFrequencyByWordIdSchema } from "./word.schema";
import { authGuard } from "../../middlewares/authGuard";

const router = express.Router();

router.post(
  "/:wordId/frequency",
  authGuard("word:toggle-frequency"),
  validateRequest({ body: createWordFrequencySchema, params: getWordFrequencyByWordIdSchema }),
  toggleWordFrequency as unknown as RequestHandler
);

export default router;
