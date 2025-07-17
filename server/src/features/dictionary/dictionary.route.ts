import express, { RequestHandler } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { getWordFromDictionarySChema } from "./dictionary.schema";

const router = express.Router();

import { getWordFromDictionary } from "./dictionary.controller";

router.get(
  "/:word",
  validateRequest({ params: getWordFromDictionarySChema }),
  getWordFromDictionary as unknown as RequestHandler
);

export default router;
