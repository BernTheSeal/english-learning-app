import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { sendSuccessResponse } from "../../shared/response/sendSuccessResponse";
import rolePermissionService from "./rolePermission.service";
import { RolePermissionHanlder } from "./rolePermission.type";

export const addPermissionToRole: RolePermissionHanlder = async (req, res, next) => {
  const { roleId, permissionId } = req.validatedParams;
  try {
    const { permission, role } = await rolePermissionService.addPermissionToRole({
      roleId,
      permissionId,
    });

    sendSuccessResponse(
      res,
      `' '${permission.name.toUpperCase()}'  successfully added to '${role.name.toUpperCase()}'`,
      HTTP_SUCCESS_STATUS.CREATED
    );

    return;
  } catch (error) {
    next(error);
  }
};

export const removePermissionFromRole: RolePermissionHanlder = async (req, res, next) => {
  const { roleId, permissionId } = req.validatedParams;
  try {
    const { permission, role } = await rolePermissionService.removePermissionFromRole({
      roleId,
      permissionId,
    });
    sendSuccessResponse(
      res,
      `'${permission.name.toUpperCase()}' was successfully removed from '${role.name.toUpperCase()}'`,
      HTTP_SUCCESS_STATUS.OK
    );

    return;
  } catch (error) {
    next(error);
  }
};
