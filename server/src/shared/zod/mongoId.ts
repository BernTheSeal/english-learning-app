import { z } from "zod";
import { Types } from "mongoose";

export const zodMongoId = z
  .string()
  .length(24, "ID must be a 24-character string.")
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format.");
// .transform((id) => new Types.ObjectId(id));
