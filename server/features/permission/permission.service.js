import HTTP_STATUS from "../../config/httpStatus.js";

import { sendSuccessResponse } from "../../utils/responseHelper.js";
import { PermissionError } from "../../errors/permissionError.js";

import { Permission } from "./permission.model.js";
import { RolePermission } from "../rolePermission/rolePermission.model.js";

const getPermission = async ({ isActive, isDeleteable }) => {
  const filter = {};
  if (isActive) {
    filter.isActive = isActive === "true";
  }
  if (isDeleteable) {
    filter.isDeleteable = isDeleteable === "true";
  }

  return await Permission.find(filter);
};

const getPermissionById = async ({ permissionId }) => {
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw new PermissionError(
      "Permission not found with the provided ID.",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const rolePermissions = await RolePermission.find({ permissionId }).populate(
    "roleId",
    "name description"
  );

  const roles = rolePermissions.map((entry) => ({
    name: entry.roleId.name,
    description: entry.roleId.description,
  }));

  return { permission, roles };
};

const addPermission = async ({ name, description, isDeleteable, isActive, user }) => {
  const permission = await Permission.findOne({ name });
  if (permission) {
    throw new PermissionError(
      `The ${permission.name.toUpperCase()} permission already exists.`,
      HTTP_STATUS.CONFLICT
    );
  }

  return await Permission.create({
    name,
    description,
    isDeleteable,
    isActive,
    createdBy: user._id,
  });
};

const deletePermission = async ({ permissionId }) => {
  const permission = await Permission.findById(permissionId);
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

  await RolePermission.deleteMany({ permissionId });
  return await Permission.findOneAndDelete({ _id: permissionId });
};

const updatePermission = async ({ permissionId, updates }) => {
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw new PermissionError(
      "Permission not found with the provided ID.",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const modelFields = Object.keys(Permission.schema.paths);
  const updateFields = Object.keys(updates);
  const isValidUpdate = updateFields.every((field) => modelFields.includes(field));
  if (!isValidUpdate) {
    throw new PermissionError(
      "invalid update fields. Check the updates fields",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  return await Permission.findByIdAndUpdate(permissionId, updates, {
    new: true,
    runValidators: true,
  });
};

export default {
  getPermission,
  getPermissionById,
  addPermission,
  deletePermission,
  updatePermission,
};
