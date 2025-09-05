import { z } from "zod";

export const zodSentence = z
  .string({ required_error: "Sentence is required." })
  .min(3, { message: "Sentence must be at least 3 characters long." })
  .max(200, { message: "Sentence cannot exceed 200 characters." })
  .regex(/^[a-zA-Z .,!?'\n-]+$/, {
    message:
      "Sentence contains invalid characters. Only letters, spaces, newlines, and .,!?'- are allowed.",
  })
  .trim();
