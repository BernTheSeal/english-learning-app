import HTTP_STATUS from "../../config/httpStatus.js";

import { PermissionError } from "./permission.error.js";

import permissionRepository from "./permission.repository.js";
import rolePermissionRepository from "../rolePermission/rolePermission.repository.js";

const getPermissions = async ({ isActive, isDeleteable }) => {
  const filter = {};
  if (isActive) {
    filter.isActive = isActive === "true";
  }
  if (isDeleteable) {
    filter.isDeleteable = isDeleteable === "true";
  }

  return await permissionRepository.listByFilter(filter);
};

const getPermissionById = async ({ permissionId }) => {
  const permission = await permissionRepository.getById(permissionId);
  if (!permission) {
    throw new PermissionError(
      "Permission not found with the provided ID.",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const roles = await rolePermissionRepository.getRolesByPermissionId(permissionId);

  return { permission, roles };
};

const createPermission = async ({ name, description, isDeleteable, isActive, user }) => {
  const permission = await permissionRepository.getByName(name);
  if (permission) {
    throw new PermissionError(
      `The ${permission.name.toUpperCase()} permission already exists.`,
      HTTP_STATUS.CONFLICT
    );
  }

  return await permissionRepository.create({
    name,
    description,
    isDeleteable,
    isActive,
    createdBy: user._id,
  });
};

const deletePermission = async ({ permissionId }) => {
  const permission = await permissionRepository.getById(permissionId);
  if (!permission) {
    throw new PermissionError(
      "Permission not found with the provided ID.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!permission.isDeleteable) {
    throw new PermissionError(
      ` '${permission.name.toUpperCase()}' permission is protected and cannot be deleted.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  await rolePermissionRepository.deleteRolesByPermissionId(permissionId);
  return await permissionRepository.deleteById(permissionId);
};

const updatePermission = async ({ permissionId, updates }) => {
  const permission = await permissionRepository.getById(permissionId);

  if (!permission) {
    throw new PermissionError(
      "Permission not found with the provided ID.",
      HTTP_STATUS.NOT_FOUND
    );
  }
  return await permissionRepository.updateById(permissionId, updates);
};

export default {
  getPermissions,
  getPermissionById,
  createPermission,
  deletePermission,
  updatePermission,
};
