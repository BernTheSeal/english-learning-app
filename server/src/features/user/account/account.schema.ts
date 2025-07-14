import { z } from "zod";
import { zodEmail, zodPassword, zodUsername, zodMongoId } from "../../../shared/zod";

export const createUserSchema = z
  .object({
    email: zodEmail,
    password: zodPassword,
    username: zodUsername,
  })
  .strict();

export const deleteUserSchema = z.object({ userId: zodMongoId }).strict();
