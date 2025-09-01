import { z } from "zod";

export const zodEmail = z
  .string({ required_error: "Please enter your email address." })
  .trim()
  .toLowerCase()
  .email("That doesn’t look like a valid email.")
  .max(100, "Email can’t be longer than 100 characters.");
