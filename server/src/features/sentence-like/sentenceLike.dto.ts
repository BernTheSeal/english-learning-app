import z from "zod";

import {
  toggleSenteceLikeBodySchema,
  toggleSentenceLikeParamsSchema,
} from "./sentenceLike.schema";

export type ToggleSentenceLikeBodyDTO = z.infer<typeof toggleSenteceLikeBodySchema>;
export type ToggleSentenceLikeParamsDTO = z.infer<typeof toggleSentenceLikeParamsSchema>;
