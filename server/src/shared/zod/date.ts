import { z } from "zod";

export const zodDate = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format. A valid ISO 8601 date string is required.",
  })
  .transform((val) => new Date(val));
