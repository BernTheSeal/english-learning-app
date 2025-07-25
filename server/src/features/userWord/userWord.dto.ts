import z from "zod";
import { createUserWordSchema, trackUserWordActivitySchema } from "./userWord.schema";

export type CreateUserWordDTO = z.infer<typeof createUserWordSchema>;

export type TrackUserWordActivityDTO = z.infer<typeof trackUserWordActivitySchema>;
