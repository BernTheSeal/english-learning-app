import { z } from "zod";
import { createUserSchema, deleteUserSchema } from "./account.schema";

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export type DeleteUserDTO = z.infer<typeof deleteUserSchema>;
