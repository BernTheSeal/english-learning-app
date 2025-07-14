import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";
import { GetRolesDTO, CreateRoleDTO, UpdateRoleDTO, GetRoleByIdDTO } from "./role.dto";

export type GetRolesHandler = ValidatedRequestHandler<{}, any, {}, GetRolesDTO>;
export type GetRoleByIdHandler = ValidatedRequestHandler<GetRoleByIdDTO, any, {}, {}>;
export type CreateRoleHandler = ValidatedRequestHandler<{}, any, CreateRoleDTO, {}>;
export type UpdateRoleHandler = ValidatedRequestHandler<GetRoleByIdDTO, any, UpdateRoleDTO, {}>;
export type DeleteRoleHandler = ValidatedRequestHandler<GetRoleByIdDTO, any, {}, {}>;
