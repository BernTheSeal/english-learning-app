import { z } from "zod";
import { zodMongoId, zodBoolean } from "../../../shared/zod";

export const getUsersSchema = z
  .object({
    isVerified: zodBoolean.optional(),
    role: z.string().optional(),
  })
  .strict();

export const getUserByIdSchema = z.object({ userId: zodMongoId });
