import HTTP_STATUS from "../../config/httpStatus.js";

import RolePermissionError from "./rolePermission.error.js";

import roleRepository from "../role/role.repository.js";
import permissionRepository from "../permission/permission.repository.js";
import rolePermissionRepository from "./rolePermission.repository.js";

const addPermissionToRole = async ({ roleId, permissionId }) => {
  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RolePermissionError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }

  const permission = await permissionRepository.getById(permissionId);
  if (!permission) {
    throw new RolePermissionError("Permission not found.", HTTP_STATUS.NOT_FOUND);
  }

  const isExists = await rolePermissionRepository.existsByIds(roleId, permissionId);
  if (isExists) {
    throw new RolePermissionError(
      `'${role.name.toUpperCase()}' already has the '${permission.name.toUpperCase()}' permission.`,
      HTTP_STATUS.CONFLICT
    );
  }

  await rolePermissionRepository.create(roleId, permissionId);

  return { permission, role };
};

const removePermissionFromRole = async ({ roleId, permissionId }) => {
  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RolePermissionError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }

  const permission = await permissionRepository.getById(permissionId);
  if (!permission) {
    throw new RolePermissionError("Permission not found.", HTTP_STATUS.NOT_FOUND);
  }

  const isExists = await rolePermissionRepository.existsByIds(roleId, permissionId);
  if (!isExists) {
    throw new RolePermissionError(
      `'${role.name.toUpperCase()}' does not have the '${permission.name.toUpperCase()}' permission.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await rolePermissionRepository.deleteByIds(roleId, permissionId);

  return { permission, role };
};

export default { addPermissionToRole, removePermissionFromRole };
