import z from "zod";
import { zodWord, zodMongoIdObjectId, zodSentence } from "../../../shared/zod";

export const createSentenceBodySchema = z
  .object({
    content: zodSentence,
    word: zodWord,
    parentId: zodMongoIdObjectId.optional(),
  })
  .strict();

export const deleteSentenceSchema = z
  .object({
    sentenceId: zodMongoIdObjectId,
  })
  .strict();

export const getSentencesSchema = z
  .object({
    cursor: zodMongoIdObjectId.optional(),
    parentId: zodMongoIdObjectId.optional(),
  })
  .strict();

export const getASentenceSchema = z
  .object({
    sentenceId: zodMongoIdObjectId,
  })
  .strict();
