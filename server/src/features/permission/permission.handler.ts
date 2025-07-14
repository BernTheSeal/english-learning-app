import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";
import {
  GetPermissionsDTO,
  CreatePermissionDTO,
  UpdatePermissionDTO,
  GetPermissionByIdDTO,
} from "./permission.dto";

export type GetPermissionsHandler = ValidatedRequestHandler<{}, any, {}, GetPermissionsDTO>;
export type GetPermissionByIdHandler = ValidatedRequestHandler<GetPermissionByIdDTO, any, {}, {}>;
export type CreatePermissionHandler = ValidatedRequestHandler<{}, any, CreatePermissionDTO, {}>;
export type UpdatePermissionHandler = ValidatedRequestHandler<
  GetPermissionByIdDTO,
  any,
  UpdatePermissionDTO,
  {}
>;
export type DeletePermissionHandler = ValidatedRequestHandler<GetPermissionByIdDTO, any, {}, {}>;
