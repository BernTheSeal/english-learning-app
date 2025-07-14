import { ValidatedRequestHandler } from "../../../types/ValidateRequestHandler";
import { GetUsersDTO, GetUserByIdDTO } from "./query.dto";

export type GetUsersHandler = ValidatedRequestHandler<{}, any, {}, GetUsersDTO>;

export type GetUserByIdHandler = ValidatedRequestHandler<GetUserByIdDTO, any, {}, {}>;
