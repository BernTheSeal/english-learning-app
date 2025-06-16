import { UserRole } from "../features/userRole/userRole.model.js";
import { RolePermission } from "../features/rolePermission/rolePermission.model.js";
import { Permission } from "../features/permission/permission.model.js";
import { PermissionError } from "../errors/permissionError.js";
import { sendErrorResponse } from "../utils/responseHelper.js";
import HTTP_STATUS from "../config/httpStatus.js";

export const checkPermissions = (permission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const permissions = await Permission.findOne({ name: permission });

      if (!permissions) {
        throw new PermissionError(
          "Permission not found.",
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }

      if (!permissions.isActive) {
        throw new PermissionError(
          "This feature is temporarily disabled. Please try again later.",
          HTTP_STATUS.FORBIDDEN
        );
      }

      const userRoles = await UserRole.find({ userId: user._id });
      const roleIds = userRoles.map((ur) => ur.roleId);

      const exists = await RolePermission.exists({
        roleId: { $in: roleIds },
        permissionId: permissions._id,
      });

      if (!exists) {
        throw new PermissionError("You do not have permission to perform this action.");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
