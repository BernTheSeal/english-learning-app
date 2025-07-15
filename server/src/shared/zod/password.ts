import { z } from "zod";

export const zodPassword = z
  .string({ required_error: "Password is required." })
  .min(8, "Password must be at least 8 characters.")
  .max(64, "Password must be at most 64 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.");
