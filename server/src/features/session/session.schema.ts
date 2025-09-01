import { z } from "zod";
import { zodEmail } from "../../shared/zod";

export const createSessionSchema = z
  .object({
    email: zodEmail,
    password: z.string(),
  })
  .strict();
