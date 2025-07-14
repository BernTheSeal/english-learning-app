import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { sendSuccessResponse } from "../../shared/response";
import permissionService from "./permission.service";
import {
  GetPermissionsHandler,
  GetPermissionByIdHandler,
  CreatePermissionHandler,
  DeletePermissionHandler,
  UpdatePermissionHandler,
} from "./permission.handler";

export const getPermissions: GetPermissionsHandler = async (req, res, next) => {
  const { isActive, isDeleteable } = req.validatedQuery;

  try {
    const permission = await permissionService.getPermissions({ isActive, isDeleteable });

    sendSuccessResponse(res, "Permissions filtered successfully.", HTTP_SUCCESS_STATUS.OK, {
      permission,
    });

    return;
  } catch (error) {
    next(error);
  }
};

export const getPermissionById: GetPermissionByIdHandler = async (req, res, next) => {
  const { permissionId } = req.validatedParams;

  try {
    const { permission, roles } = await permissionService.getPermissionById(permissionId);

    sendSuccessResponse(res, "Permission fetched successfully by ID.", HTTP_SUCCESS_STATUS.OK, {
      permission,
      roles,
    });

    return;
  } catch (error) {
    next(error);
  }
};

export const createPermission: CreatePermissionHandler = async (req, res, next) => {
  const { name, description, isDeleteable, isActive } = req.validatedBody;

  const userId = req.userId!;

  try {
    const permission = await permissionService.createPermission({
      name,
      description,
      isDeleteable,
      isActive,
      createdBy: userId,
    });

    sendSuccessResponse(res, "Permission created successfully.", HTTP_SUCCESS_STATUS.CREATED, {
      permission,
    });

    return;
  } catch (error) {
    next(error);
  }
};

export const deletePermission: DeletePermissionHandler = async (req, res, next) => {
  const { permissionId } = req.validatedParams;

  try {
    const permission = await permissionService.deletePermission(permissionId);

    sendSuccessResponse(
      res,
      `'${permission.name.toUpperCase()}' successfullly has been deleted.'`,
      HTTP_SUCCESS_STATUS.OK
    );

    return;
  } catch (error) {
    next(error);
  }
};

export const updatePermission: UpdatePermissionHandler = async (req, res, next) => {
  const { permissionId } = req.validatedParams;
  const updates = req.validatedBody;

  try {
    const updatedPermission = await permissionService.updatePermission({
      permissionId,
      updates,
    });

    sendSuccessResponse(res, "The Permission is updated.", HTTP_SUCCESS_STATUS.OK, {
      updatedPermission,
      fields: updates,
    });

    return;
  } catch (error) {
    next(error);
  }
};
