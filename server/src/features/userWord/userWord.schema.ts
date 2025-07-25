import { z } from "zod";
import { zodWord, zodDate, zodBoolean } from "../../shared/zod";

const userWordStatusSchema = z.enum(["new", "learning", "familiar", "mastered"]);

export const createUserWordSchema = z
  .object({
    word: zodWord,
    status: userWordStatusSchema,
    nextReviewAt: zodDate.optional(),
  })
  .strict();

const wordSchema = z
  .object({
    name: zodWord,
    viewMeaning: zodBoolean,
  })
  .strict();

export const trackUserWordActivitySchema = z.object({ words: z.array(wordSchema) }).strict();
