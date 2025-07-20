import { z } from "zod";
import { zodBoolean, zodMongoId } from "../../shared/zod";

export const createWordSchema = z
  .object({
    name: z
      .string()
      .min(1, "Word must be at least 1 character long.")
      .max(20, "Word must be at most 20 characters long.")
      .regex(/^[a-zA-Z-]+$/, "Word must contain only letters and hyphens."),
    first3k: zodBoolean.optional(),
    level: z
      .enum(["a1", "a2", "b1", "b2", "c1", "c2"], {
        errorMap: () => ({ message: "Level must be one of: a1, a2, b1, b2, c1, or c2." }),
      })
      .optional(),
  })
  .strict();

export const createWordFrequencySchema = z.object({
  point: z
    .number({ required_error: "Point is required.", invalid_type_error: "Point must be a number." })
    .int("Point must be an integer.")
    .min(0, "Point cannot be less than 0.")
    .max(5, "Point cannot be greater than 5."),
});

export const getWordFrequencyByWordIdSchema = z.object({
  wordId: zodMongoId,
});
