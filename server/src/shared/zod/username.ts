import { z } from "zod";

export const zodUsername = z
  .string({ required_error: "Username is required." })
  .trim()
  .min(3, "Username must be at least 3 characters.")
  .max(30, "Username must be at most 30 characters.")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes.");
