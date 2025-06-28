import HTTP_STATUS from "../../config/httpStatus.js";

import roleRepository from "./role.repository.js";
import rolePermissionRepository from "../rolePermission/rolePermission.repository.js";
import userRoleRepository from "../userRole/userRole.repository.js";

import { RoleError } from "./role.error.js";

const getRoles = async ({ isActive, isDeleteable }) => {
  const filter = {};
  if (isActive) {
    filter.isActive = isActive === "true";
  }
  if (isDeleteable) {
    filter.isDeleteable = isDeleteable === "true";
  }

  return await roleRepository.listByFilter(filter);
};

const getRoleById = async ({ roleId }) => {
  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  const permissions = await rolePermissionRepository.getPermissionsByRoleId(role._id);

  const users = await userRoleRepository.getUsersByRoleId(role._id);

  return { role, permissions, users };
};

const getRoleByName = async (roleName) => {
  const role = await roleRepository.getByName(roleName);
  if (!role) {
    throw new RoleError("Role not found with the provided name.", HTTP_STATUS.NOT_FOUND);
  }

  return role;
};

const createRole = async ({ name, description, isActive, isDeleteable, user }) => {
  const role = await roleRepository.getByName(name);
  if (role) {
    throw new RoleError(
      `The '${role.name.toUpperCase()}' role already exists.`,
      HTTP_STATUS.CONFLICT
    );
  }

  const newRole = await roleRepository.create({
    name,
    description,
    isActive,
    isDeleteable,
    createdBy: user._id,
  });

  return { newRole };
};

const deleteRole = async ({ roleId }) => {
  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  if (!role.isDeleteable) {
    throw new RoleError(
      ` '${role.name.toUpperCase()}' role is protected and cannot be deleted.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const affectedUsers = await userRoleRepository.getUsersByRoleId(roleId);

  for (const user of affectedUsers) {
    const roles = await userRoleRepository.getRolesByUserId(user._id);
    if (roles.length === 1) {
      const defaultRole = await roleRepository.getByName("user");
      await userRoleRepository.create(user._id, defaultRole._id);
    }
  }

  await rolePermissionRepository.deletePermissionsByRoleId(roleId);
  await userRoleRepository.deleteUsersByRoleId(roleId);
  return await roleRepository.deleteById(roleId);
};

const updateRole = async ({ roleId, updates }) => {
  if (!updates) {
    throw new RoleError("No update data provided.", HTTP_STATUS.BAD_REQUEST);
  }

  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  const existingRole = await roleRepository.getByName(updates?.name);
  if (existingRole) {
    throw new RoleError(
      `The role '${existingRole.name.toUpperCase()}' is already in use.`,
      HTTP_STATUS.CONFLICT
    );
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
