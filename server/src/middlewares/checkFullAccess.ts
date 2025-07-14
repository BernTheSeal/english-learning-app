import { UserRole } from "../features/userRole/userRole.model";
import { Request, Response, NextFunction } from "express";
import { IUserRole } from "../features/userRole/userRole.type";

export const checkFullAccess = (...rolesAllowed: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const userRoles = (await UserRole.find({ userId }).populate("roleId")) as IUserRole[];

    const fullAccess = userRoles.some(({ roleId }) => {
      if (typeof roleId === "object" && roleId !== null && "name" in roleId) {
        return rolesAllowed.includes(roleId.name);
      }
      return false;
    });

    req.fullAccess = fullAccess;
  };
};
