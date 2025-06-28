import HTTP_STATUS from "../../config/httpStatus.js";
import { sendSuccessResponse } from "../../utils/responseHelper.js";
import roleService from "./role.service.js";

export const getRoles = async (req, res, next) => {
  const { isActive, isDeleteable } = req.query;

  try {
    const roles = await roleService.getRoles({ isActive, isDeleteable });
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
    const { role, permissions, users } = await roleService.getRoleById({ roleId });

    return sendSuccessResponse(res, "Role fetched successfully by ID.", HTTP_STATUS.OK, {
      role,
      permissions,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const createRole = async (req, res, next) => {
  const { name, description, isActive, isDeleteable } = req.body;
  const user = req.user;
  try {
    const role = await roleService.createRole({
      name,
      description,
      isActive,
      isDeleteable,
      user,
    });

    return sendSuccessResponse(res, "Role created successfully.", HTTP_STATUS.CREATED, {
      role,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  const { roleId } = req.params;
  try {
    const deletedRole = await roleService.deleteRole({ roleId });

    return sendSuccessResponse(
      res,
      `'${deletedRole.name.toUpperCase()}' successfully has been deleted.'`,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  const { roleId } = req.params;
  const updates = req.body;

  try {
    const updatedRole = await roleService.updateRole({ roleId, updates });
    return sendSuccessResponse(res, "The role is updated.", HTTP_STATUS.OK, {
      updatedRole,
      fields: updates,
    });
  } catch (error) {
    next(error);
  }
};
