import HTTP_STATUS from "../../config/httpStatus.js";
import { sendSuccessResponse } from "../../utils/responseHelper.js";
import rolePermissionService from "./rolePermission.service.js";

export const addPermissionToRole = async (req, res, next) => {
  const { roleId, permissionId } = req.params;
  try {
    const { permission, role } = await rolePermissionService.addPermissionToRole({
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
    const { permission, role } = await rolePermissionService.removePermissionFromRole({
      roleId,
      permissionId,
    });
    return sendSuccessResponse(
      res,
      `'${permission.name.toUpperCase()}' was successfully removed from '${role.name.toUpperCase()}'`,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
