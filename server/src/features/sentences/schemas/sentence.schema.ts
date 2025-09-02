import z from "zod";
import { zodWord, zodMongoIdObjectId, zodSentence } from "../../../shared/zod";

export const createSentenceBodySchema = z
  .object({
    content: zodSentence,
    word: zodWord,
    parentId: zodMongoIdObjectId.optional(),
  })
  .strict();
