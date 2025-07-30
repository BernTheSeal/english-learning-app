import { RoleDocument } from "../role/role.type";
import { PermissionDocument } from "../permission/permission.type";
import { Document, Types } from "mongoose";
import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";
import { rolePermissionSchema } from "./rolePermission.schema";
import { z } from "zod";

export interface IRolePermission {
  roleId: Types.ObjectId | RoleDocument;
  permissionId: Types.ObjectId | PermissionDocument;
}

export interface RolePermissionDocument extends IRolePermission, Document {}

type RolePermissionDTO = z.infer<typeof rolePermissionSchema>;

export type rolePermissionInput = RolePermissionDTO;

export type RolePermissionHanlder = ValidatedRequestHandler<RolePermissionDTO, any, {}, {}>;
