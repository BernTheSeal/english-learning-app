import { HTTP_ERROR_STATUS } from "../../config/httpStatus";
import RolePermissionError from "./rolePermission.error";
import roleRepository from "../role/role.repository";
import permissionRepository from "../permission/permission.repository";
import rolePermissionRepository from "./rolePermission.repository";
import { rolePermissionInput } from "./rolePermission.type";

const addPermissionToRole = async ({ roleId, permissionId }: rolePermissionInput) => {
  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RolePermissionError("Role not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const permission = await permissionRepository.getById(permissionId);
  if (!permission) {
    throw new RolePermissionError("Permission not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const isExists = await rolePermissionRepository.existsByIds(roleId, permissionId);
  if (isExists) {
    throw new RolePermissionError(
      `'${role.name.toUpperCase()}' already has the '${permission.name.toUpperCase()}' permission.`,
      HTTP_ERROR_STATUS.CONFLICT
    );
  }

  await rolePermissionRepository.create(roleId, permissionId);

  return { permission, role };
};

const removePermissionFromRole = async ({ roleId, permissionId }: rolePermissionInput) => {
  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RolePermissionError("Role not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const permission = await permissionRepository.getById(permissionId);
  if (!permission) {
    throw new RolePermissionError("Permission not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const isExists = await rolePermissionRepository.existsByIds(roleId, permissionId);
  if (!isExists) {
    throw new RolePermissionError(
      `'${role.name.toUpperCase()}' does not have the '${permission.name.toUpperCase()}' permission.`,
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  await rolePermissionRepository.deleteByIds(roleId, permissionId);

  return { permission, role };
};

export default { addPermissionToRole, removePermissionFromRole };
