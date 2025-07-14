import { ValidatedRequestHandler } from "../../../types/ValidateRequestHandler";
import { CreateUserDTO, DeleteUserDTO } from "./account.dto";

export type RegisterHandler = ValidatedRequestHandler<{}, any, CreateUserDTO, {}>;

export type DeleteUserHandler = ValidatedRequestHandler<DeleteUserDTO, any, {}, {}>;
