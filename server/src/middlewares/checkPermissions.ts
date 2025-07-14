import { UserRole } from "../features/userRole/userRole.model";

import { RolePermission } from "../features/rolePermission/rolePermission.model";
import { Permission } from "../features/permission/permission.model";

import PermissionError from "../features/permission/permission.error";
import { HTTP_ERROR_STATUS } from "../config/httpStatus";
import { Request, Response, NextFunction } from "express";

export const checkPermissions = (permissionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const permission = await Permission.findOne({ name: permissionName });

      if (!permission) {
        throw new PermissionError("Permission not found.", HTTP_ERROR_STATUS.FORBIDDEN);
      }

      if (!permission.isActive) {
        throw new PermissionError(
          "This feature is temporarily disabled. Please try again later.",
          HTTP_ERROR_STATUS.FORBIDDEN
        );
      }

      const userRoles = await UserRole.find({ userId: userId });
      const roleIds = userRoles.map((ur) => ur.roleId);

      const exists = await RolePermission.exists({
        roleId: { $in: roleIds },
        permissionId: permission._id,
      });

      if (!exists) {
        throw new PermissionError(
          "You do not have permission to perform this action.",
          HTTP_ERROR_STATUS.FORBIDDEN
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
