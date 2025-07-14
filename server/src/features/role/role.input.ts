import { CreateRoleDTO, GetRolesDTO, UpdateRoleDTO } from "./role.dto";

export type filterRoleInput = GetRolesDTO;

export type createRoleInput = CreateRoleDTO & { createdBy: string };

export type updateRoleInput = UpdateRoleDTO;
