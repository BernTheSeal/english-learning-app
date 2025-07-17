import { z } from "zod";

export const getWordFromDictionarySChema = z.object({
  word: z
    .string()
    .min(1, "Word must be at least 1 character long.")
    .max(20, "Word must be at most 20 characters long.")
    .regex(/^[a-zA-Z-]+$/, "Word must contain only letters and hyphens."),
});
