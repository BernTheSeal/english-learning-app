import { Role } from "../models/role.model.js";
import { UserRole } from "../models/userRole.model.js";
import { RoleError } from "../errors/roleError.js";
import HTTP_STATUS from "../config/httpStatus.js";
import { sendSuccessResponse } from "../utils/responseHelper.js";
import { RolePermission } from "../models/rolePermission.model.js";
import { Permission } from "../models/permission.model.js";

export const getRoles = async (req, res) => {
  const { isActive, isDeleteable } = req.query;
  const filter = {};
  try {
    if (isActive) {
      filter.isActive = isActive === "true";
    }
    if (isDeleteable) {
      filter.isDeleteable = isDeleteable === "true";
    }

    const roles = await Role.find(filter);
    return sendSuccessResponse(
      res,
      `Successfully retrieved all roles from the database. Total roles: ${roles.length}.`,
      HTTP_STATUS.OK,
      { roles }
    );
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req, res, next) => {
  const { roleId } = req.params;
  try {
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

    return sendSuccessResponse(res, "Role fetched successfully by ID.", HTTP_STATUS.OK, {
      role,
      permissions,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const addRole = async (req, res, next) => {
  const { name, description, isActive, isDeleteable } = req.body;
  const user = req.user;
  try {
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

    return sendSuccessResponse(res, "Role created successfully.", HTTP_STATUS.CREATED, {
      role: newRole,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  const { roleId } = req.params;
  try {
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
    const deletedRole = await Role.findByIdAndDelete(roleId);

    return sendSuccessResponse(
      res,
      `'${deletedRole.name.toUpperCase()}' successfullly has been deleted.'`,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  const { roleId } = req.params;
  const updates = req.body;

  if (!updates) {
    throw new RoleError("No update data provided.", HTTP_STATUS.BAD_REQUEST);
  }

  try {
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

    const updatedRole = await Role.findByIdAndUpdate(roleId, updates, {
      new: true,
      runValidators: true,
    });

    return sendSuccessResponse(res, "The role is updated.", HTTP_STATUS.OK, {
      updatedRole,
      fields: updates,
    });
  } catch (error) {
    next(error);
  }
};

export const addPermissionToRole = async (req, res, next) => {
  const { roleId, permissionId } = req.params;
  try {
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

    return sendSuccessResponse(
      res,
      `' '${permission.name.toUpperCase()}'  successfully added to '${role.name.toUpperCase()}'`,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    next(error);
  }
};

export const removePermissionFromRole = async (req, res, next) => {
  const { roleId, permissionId } = req.params;
  try {
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

    return sendSuccessResponse(
      res,
      `'${permission.name.toUpperCase()}' was successfully removed from '${role.name.toUpperCase()}'`,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
