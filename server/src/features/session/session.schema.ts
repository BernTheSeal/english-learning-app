import { z } from "zod";
import { zodEmail, zodPassword } from "../../shared/zod";

export const createSessionSchema = z.object({
  email: zodEmail,
  password: zodPassword,
});
