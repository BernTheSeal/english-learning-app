import z from "zod";
import { zodMongoIdObjectId } from "../../shared/zod";

export const toggleSenteceLikeBodySchema = z
  .object({
    category: z.enum(["funny", "daily", "formal"], {
      required_error: "Like category is required",
      invalid_type_error: "Category must be one of: 'funny', 'daily', or 'formal'",
    }),
  })
  .strict();

export const toggleSentenceLikeParamsSchema = z
  .object({
    sentenceId: zodMongoIdObjectId,
  })
  .strict();
