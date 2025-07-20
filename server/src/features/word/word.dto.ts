import { createWordSchema, createWordFrequencySchema, getWordFrequencyByWordIdSchema } from "./word.schema";
import { z } from "zod";

export type CreateWordDTO = z.infer<typeof createWordSchema>;
export type CreateWordFrequencyDTO = z.infer<typeof createWordFrequencySchema>;
export type getWordFrequencyByWordIdDTO = z.infer<typeof getWordFrequencyByWordIdSchema>;
