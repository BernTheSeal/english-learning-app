import { z } from "zod";

export const zodEmail = z
  .string({ required_error: "Email is required." })
  .trim()
  .toLowerCase()
  .email("Invalid email format.")
  .max(100, "Email must be at most 100 characters.");
