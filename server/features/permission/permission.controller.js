import HTTP_STATUS from "../../config/httpStatus.js";
import { sendSuccessResponse } from "../../utils/responseHelper.js";
import permissionService from "./permission.service.js";

export const getPermissions = async (req, res, next) => {
  const { isActive, isDeleteable } = req.query;

  try {
    const permission = await permissionService.getPermission({ isActive, isDeleteable });

    return sendSuccessResponse(
      res,
      "Permissions filtered successfully.",
      HTTP_STATUS.OK,
      {
        permission,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getPermissionById = async (req, res, next) => {
  const { permissionId } = req.params;
  try {
    const { permission, roles } = await permissionService.getPermissionById({
      permissionId,
    });

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
    const permission = await permissionService.addPermission({
      name,
      description,
      isDeleteable,
      isActive,
      user,
    });

    return sendSuccessResponse(
      res,
      "Permission created successfully.",
      HTTP_STATUS.CREATED,
      {
        permission,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const deletePermission = async (req, res, next) => {
  const { permissionId } = req.params;

  try {
    const permission = await permissionService.deletePermission({ permissionId });
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
    const updatedPermission = await permissionService.updatePermission({
      permissionId,
      updates,
    });

    return sendSuccessResponse(res, "The Permission is updated.", HTTP_STATUS.OK, {
      updatedPermission,
      fields: updates,
    });
  } catch (error) {
    next(error);
  }
};
