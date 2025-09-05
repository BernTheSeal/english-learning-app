import z from "zod";
import {
  createSentenceBodySchema,
  deleteSentenceSchema,
  getSentencesSchema,
  getASentenceSchema,
} from "./sentence.schema";

export type CreateSentenceBodyDTO = z.infer<typeof createSentenceBodySchema>;
export type DeleteSentenceDTO = z.infer<typeof deleteSentenceSchema>;
export type GetSentencesDTO = z.infer<typeof getSentencesSchema>;
export type GetASentenceDTO = z.infer<typeof getASentenceSchema>;
