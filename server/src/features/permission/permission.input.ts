import { CreatePermissionDTO, GetPermissionsDTO, UpdatePermissionDTO } from "./permission.dto";

export type FilterPermissionInput = GetPermissionsDTO;

export type CreatePermissionInput = CreatePermissionDTO & { createdBy: string };

export type UpdatePermissionInput = UpdatePermissionDTO;
