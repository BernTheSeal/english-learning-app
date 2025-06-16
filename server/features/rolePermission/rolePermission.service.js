import HTTP_STATUS from "../../config/httpStatus.js";

import { RoleError } from "../../errors/roleError.js";

import { Role } from "../role/role.model.js";
import { RolePermission } from "./rolePermission.model.js";
import { Permission } from "../permission/permission.model.js";

const addPermissionToRole = async ({ roleId, permissionId }) => {
  const role = await Role.findById(roleId);
  if (!role) {
    throw new RoleError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw new RoleError("Permission not found.", HTTP_STATUS.NOT_FOUND);
  }

  const existingPermission = await RolePermission.exists({ roleId, permissionId });
  if (existingPermission) {
    throw new RoleError(
      `'${role.name.toUpperCase()}' already has the '${permission.name.toUpperCase()}' permission.`,
      HTTP_STATUS.CONFLICT
    );
  }

  await RolePermission.create({
    roleId,
    permissionId,
  });

  return { permission, role };
};

const removePermissionFromRole = async ({ roleId, permissionId }) => {
  const role = await Role.findById(roleId);
  if (!role) {
    throw new RoleError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw new RoleError("Permission not found.", HTTP_STATUS.NOT_FOUND);
  }

  const hasPermission = await RolePermission.findOne({ roleId, permissionId });
  if (!hasPermission) {
    throw new RoleError(
      `'${role.name.toUpperCase()}' does not have the '${permission.name.toUpperCase()}' permission.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await RolePermission.deleteOne({ roleId, permissionId });

  return { permission, role };
};

export default { addPermissionToRole, removePermissionFromRole };
