import { HTTP_ERROR_STATUS } from "../../config/httpStatus";
import PermissionError from "./permission.error";

import permissionRepository from "./permission.repository";
import rolePermissionRepository from "../rolePermission/rolePermission.repository";

import { CreatePermissionInput, FilterPermissionInput, UpdatePermissionInput } from "./permission.input";
import { isEmptyObject } from "../../utils/isEmptyObject";

const getPermissions = async ({ isActive, isDeleteable }: FilterPermissionInput) => {
  const filter: FilterPermissionInput = {};

  if (isActive !== undefined) {
    filter.isActive = isActive;
  }
  if (isDeleteable !== undefined) {
    filter.isDeleteable = isDeleteable;
  }

  return await permissionRepository.listByFilter(filter);
};

const getPermissionById = async (permissionId: string) => {
  const permission = await permissionRepository.getById(permissionId);

  if (!permission) {
    throw new PermissionError("Permission not found with the provided ID.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const roles = await rolePermissionRepository.getRolesByPermissionId(permissionId);

  return { permission, roles };
};

const createPermission = async ({
  name,
  description,
  isDeleteable,
  isActive,
  createdBy,
}: CreatePermissionInput) => {
  const permission = await permissionRepository.getByName(name);
  if (permission) {
    throw new PermissionError(
      `The ${permission.name.toUpperCase()} permission already exists.`,
      HTTP_ERROR_STATUS.CONFLICT
    );
  }

  return await permissionRepository.create({
    name,
    description,
    isDeleteable,
    isActive,
    createdBy,
  });
};

const deletePermission = async (permissionId: string) => {
  const permission = await permissionRepository.getById(permissionId);
  if (!permission) {
    throw new PermissionError("Permission not found with the provided ID.", HTTP_ERROR_STATUS.BAD_REQUEST);
  }

  if (!permission.isDeleteable) {
    throw new PermissionError(
      ` '${permission.name.toUpperCase()}' permission is protected and cannot be deleted.`,
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  const deletedPermission = await permissionRepository.deleteById(permissionId);
  if (!deletedPermission) {
    throw new PermissionError("Permission was not deleted.", HTTP_ERROR_STATUS.BAD_REQUEST);
  }

  await rolePermissionRepository.deleteRolesByPermissionId(permissionId);
  return deletedPermission;
};

const updatePermission = async ({
  permissionId,
  updates,
}: {
  permissionId: string;
  updates: UpdatePermissionInput;
}) => {
  const permission = await permissionRepository.getById(permissionId);

  if (!permission) {
    throw new PermissionError("Permission not found with the provided ID.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  if (isEmptyObject(updates)) {
    throw new PermissionError("There is no data for updating.", HTTP_ERROR_STATUS.NOT_FOUND);
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
