import { z } from "zod";

const emailToken = z.object({
  token: z.number().max(6).min(6),
});

export const verifyEmailSchema = emailToken.strict();
