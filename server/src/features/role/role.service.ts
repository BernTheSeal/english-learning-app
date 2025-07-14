import { HTTP_ERROR_STATUS } from "../../config/httpStatus";

import roleRepository from "./role.repository";
import rolePermissionRepository from "../rolePermission/rolePermission.repository";
import userRoleRepository from "../userRole/userRole.repository";

import { RoleError } from "./role.error";

import { createRoleInput, filterRoleInput, updateRoleInput } from "./role.input";
import { UserDocument } from "../user/user.type";

const getRoles = async ({ isActive, isDeleteable }: filterRoleInput) => {
  const filter: filterRoleInput = {};
  if (isActive) {
    filter.isActive = isActive;
  }
  if (isDeleteable) {
    filter.isDeleteable === isDeleteable;
  }

  return await roleRepository.listByFilter(filter);
};

const getRoleById = async (roleId: string) => {
  const role = await roleRepository.getById(roleId);

  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const permissions = await rolePermissionRepository.getPermissionsByRoleId(roleId);

  const users = await userRoleRepository.getUsersByRoleId(role._id.toString());

  return { role, permissions, users };
};

const getRoleByName = async (roleName: string) => {
  const role = await roleRepository.getByName(roleName);
  if (!role) {
    throw new RoleError("Role not found with the provided name.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  return role;
};

const createRole = async ({ name, description, isActive, isDeleteable, createdBy }: createRoleInput) => {
  const role = await roleRepository.getByName(name);
  if (role) {
    throw new RoleError(`The '${role.name.toUpperCase()}' role already exists.`, HTTP_ERROR_STATUS.CONFLICT);
  }

  const newRole = await roleRepository.create({
    name,
    description,
    isActive,
    isDeleteable,
    createdBy,
  });

  return { newRole };
};

const deleteRole = async (roleId: string) => {
  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  if (!role.isDeleteable) {
    throw new RoleError(
      ` '${role.name.toUpperCase()}' role is protected and cannot be deleted.`,
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  const affectedUsers = (await userRoleRepository.getUsersByRoleId(roleId)) as UserDocument[];

  for (const user of affectedUsers) {
    const roles = await userRoleRepository.getRolesByUserId(String(user._id));
    if (roles.length === 1) {
      const defaultRole = await roleRepository.getByName("user");
      if (!defaultRole) {
        throw new RoleError("User role is not found..", HTTP_ERROR_STATUS.NOT_FOUND);
      }
      await userRoleRepository.create(String(user._id), String(defaultRole._id));
    }
  }

  await rolePermissionRepository.deletePermissionsByRoleId(roleId);
  await userRoleRepository.deleteUsersByRoleId(roleId);

  const deletedRole = await roleRepository.deleteById(roleId);
  if (!deletedRole) {
    throw new RoleError(` '${role.name.toUpperCase()}' role was not deleted.`, HTTP_ERROR_STATUS.BAD_REQUEST);
  }
  return deletedRole;
};

const updateRole = async ({ roleId, updates }: { roleId: string; updates: updateRoleInput }) => {
  if (!updates) {
    throw new RoleError("No update data provided.", HTTP_ERROR_STATUS.BAD_REQUEST);
  }

  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  return await roleRepository.updateById(roleId, updates);
};

export default {
  getRoles,
  getRoleById,
  getRoleByName,
  createRole,
  deleteRole,
  updateRole,
};
