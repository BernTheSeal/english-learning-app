import { CreateUserDTO, DeleteUserDTO } from "./account.dto";

export type createUserInput = CreateUserDTO;

export type deleteUserInput = DeleteUserDTO & { userIdFromToken: string };
