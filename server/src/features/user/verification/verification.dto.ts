import { z } from "zod";

import { verifyEmailSchema } from "./verification.schema";

export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;
