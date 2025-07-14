import { z } from "zod";
import { createSessionSchema } from "./session.schema";

export type CreateSessionDTO = z.infer<typeof createSessionSchema>;
