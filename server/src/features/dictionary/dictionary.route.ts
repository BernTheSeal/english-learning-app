import express, { RequestHandler } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { getWordFromDictionarySChema } from "./dictionary.schema";

const router = express.Router();

import { getWordFromDictionary } from "./dictionary.controller";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

router.get(
  "/:word",
  checkAccessToken,
  validateRequest({ params: getWordFromDictionarySChema }),
  getWordFromDictionary as unknown as RequestHandler
);

export default router;
