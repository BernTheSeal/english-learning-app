import HTTP_STATUS from "../../config/httpStatus.js";

import { Role } from "./role.model.js";
import { UserRole } from "../userRole/userRole.model.js";
import { RolePermission } from "../rolePermission/rolePermission.model.js";

import { RoleError } from "../../errors/roleError.js";

const getRoles = async ({ isActive, isDeleteable }) => {
  const filter = {};
  if (isActive) {
    filter.isActive = isActive === "true";
  }
  if (isDeleteable) {
    filter.isDeleteable = isDeleteable === "true";
  }

  return await Role.find(filter);
};

const getRoleById = async ({ roleId }) => {
  const role = await Role.findById(roleId).select("-__v");
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  const rolePermissions = await RolePermission.find({ roleId }).populate(
    "permissionId",
    "name description"
  );

  const permissions = rolePermissions.map((entry) => ({
    name: entry.permissionId.name,
    description: entry.permissionId.description,
  }));

  const userRoles = await UserRole.find({ roleId }).populate("userId", "username _id");

  const users = userRoles.map((entry) => ({
    name: entry.userId.username,
    _id: entry.userId._id,
  }));

  return { role, permissions, users };
};

const addRole = async ({ name, description, isActive, isDeleteable, user }) => {
  const role = await Role.findOne({ name });
  if (role) {
    throw new RoleError(
      `The '${role.name.toUpperCase()}' role already exists.`,
      HTTP_STATUS.CONFLICT
    );
  }

  const newRole = await Role.create({
    name,
    description,
    isDeleteable,
    isActive,
    createdBy: user._id,
  });
  return { newRole };
};

const deleteRole = async ({ roleId }) => {
  const role = await Role.findById(roleId);
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  if (!role.isDeleteable) {
    throw new RoleError(
      ` '${role.name.toUpperCase()}' role is protected and cannot be deleted.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const affectedUsers = await UserRole.find({ roleId });

  for (const userRole of affectedUsers) {
    const userRoles = await UserRole.find({ userId: userRole.userId });
    if (userRoles.length === 1) {
      const defaultRole = await Role.findOne({ name: "user" }).select("_id");
      await UserRole.create({ userId: userRole.userId, roleId: defaultRole._id });
    }
  }

  await UserRole.deleteMany({ roleId });
  return await Role.findByIdAndDelete(roleId);
};

const updateRole = async ({ roleId, updates }) => {
  if (!updates) {
    throw new RoleError("No update data provided.", HTTP_STATUS.BAD_REQUEST);
  }

  const role = await Role.findById(roleId);
  if (!role) {
    throw new RoleError("Role not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  const existingRole = await Role.findOne({ name: updates?.name });
  if (existingRole) {
    throw new RoleError(
      `The role '${existingRole.name.toUpperCase()}' is already in use.`,
      HTTP_STATUS.CONFLICT
    );
  }

  return await Role.findByIdAndUpdate(roleId, updates, {
    new: true,
    runValidators: true,
  });
};

export default { getRoles, getRoleById, addRole, deleteRole, updateRole };
