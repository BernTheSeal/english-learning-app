import HTTP_STATUS from "../config/httpStatus.js";
import { Permission } from "../models/permission.model.js";
import { RolePermission } from "../models/rolePermission.model.js";
import { sendSuccessResponse } from "../utils/responseHelper.js";
import { PermissionError } from "../errors/permissionError.js";

export const getPermissions = async (req, res, next) => {
  const { isActive, isDeleteable } = req.query;
  const filter = {};
  try {
    if (isActive) {
      filter.isActive = isActive === "true";
    }
    if (isDeleteable) {
      filter.isDeleteable = isDeleteable === "true";
    }

    const filteredPermission = await Permission.find(filter);
    return sendSuccessResponse(
      res,
      "Permissions filtered successfully.",
      HTTP_STATUS.OK,
      {
        permission: filteredPermission,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getPermissionById = async (req, res, next) => {
  const { permissionId } = req.params;
  try {
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

    return sendSuccessResponse(
      res,
      "Permission fetched successfully by ID.",
      HTTP_STATUS.OK,
      {
        permission,
        roles,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const addPermission = async (req, res, next) => {
  const { name, description, isDeleteable, isActive } = req.body;
  const user = req.user;

  try {
    const permission = await Permission.findOne({ name });
    if (permission) {
      throw new PermissionError(
        `The ${permission.name.toUpperCase()} permission already exists.`,
        HTTP_STATUS.CONFLICT
      );
    }

    const newPermission = await Permission.create({
      name,
      description,
      isDeleteable,
      isActive,
      createdBy: user._id,
    });

    return sendSuccessResponse(
      res,
      "Permission created successfully.",
      HTTP_STATUS.CREATED,
      {
        permission: newPermission,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const deletePermission = async (req, res, next) => {
  const { permissionId } = req.params;

  try {
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
    await Permission.deleteOne({ _id: permissionId });
    return sendSuccessResponse(
      res,
      `'${permission.name.toUpperCase()}' successfullly has been deleted.'`,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const updatePermission = async (req, res, next) => {
  const { permissionId } = req.params;
  const updates = req.body;

  try {
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

    const updatedPermission = await Permission.findByIdAndUpdate(permissionId, updates, {
      new: true,
      runValidators: true,
    });

    return sendSuccessResponse(res, "The Permission is updated.", HTTP_STATUS.OK, {
      updatedPermission,
      fields: updates,
    });
  } catch (error) {
    next(error);
  }
};
