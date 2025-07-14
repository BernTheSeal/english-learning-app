import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { sendSuccessResponse } from "../../shared/response/sendSuccessResponse";
import roleService from "./role.service";

import {
  GetRolesHandler,
  GetRoleByIdHandler,
  CreateRoleHandler,
  DeleteRoleHandler,
  UpdateRoleHandler,
} from "./role.handler";

export const getRoles: GetRolesHandler = async (req, res, next) => {
  const { isActive, isDeleteable } = req.validatedQuery;

  try {
    const roles = await roleService.getRoles({ isActive, isDeleteable });
    sendSuccessResponse(
      res,
      `Successfully retrieved all roles from the database. Total roles: ${roles.length}.`,
      HTTP_SUCCESS_STATUS.OK,
      { roles }
    );
    return;
  } catch (error) {
    next(error);
  }
};

export const getRoleById: GetRoleByIdHandler = async (req, res, next) => {
  const { roleId } = req.validatedParams;
  try {
    const { role, permissions, users } = await roleService.getRoleById(roleId);

    sendSuccessResponse(res, "Role fetched successfully by ID.", HTTP_SUCCESS_STATUS.OK, {
      role,
      permissions,
      users,
    });

    return;
  } catch (error) {
    next(error);
  }
};

export const createRole: CreateRoleHandler = async (req, res, next) => {
  const { name, description, isActive, isDeleteable } = req.validatedBody;

  const userId = req.userId!;
  try {
    const role = await roleService.createRole({
      name,
      description,
      isActive,
      isDeleteable,
      createdBy: userId,
    });

    sendSuccessResponse(res, "Role created successfully.", HTTP_SUCCESS_STATUS.CREATED, {
      role,
    });

    return;
  } catch (error) {
    next(error);
  }
};

export const deleteRole: DeleteRoleHandler = async (req, res, next) => {
  const { roleId } = req.validatedParams;

  try {
    const deletedRole = await roleService.deleteRole(roleId);

    sendSuccessResponse(
      res,
      `'${deletedRole.name.toUpperCase()}' successfully has been deleted.'`,
      HTTP_SUCCESS_STATUS.OK
    );

    return;
  } catch (error) {
    next(error);
  }
};

export const updateRole: UpdateRoleHandler = async (req, res, next) => {
  const { roleId } = req.validatedParams;
  const updates = req.validatedBody;

  try {
    const updatedRole = await roleService.updateRole({ roleId, updates });
    sendSuccessResponse(res, "The role is updated.", HTTP_SUCCESS_STATUS.OK, {
      updatedRole,
      fields: updates,
    });
    return;
  } catch (error) {
    next(error);
  }
};
