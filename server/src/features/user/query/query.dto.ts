import { z } from "zod";
import { getUsersSchema, getUserByIdSchema } from "./query.schema";

export type GetUsersDTO = z.infer<typeof getUsersSchema>;

export type GetUserByIdDTO = z.infer<typeof getUserByIdSchema>;
