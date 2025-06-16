import { UserRole } from "../features/userRole/userRole.model.js";

export const checkFullAccess = (...rolesAllowed) => {
  return async (req, res, next) => {
    const user = req.user;

    const userRoles = await UserRole.find({ userId: user._id }).populate("roleId");

    const fullAccess = userRoles.some((role) => rolesAllowed.includes(role.roleId.name));

    req.fullAccess = fullAccess;
    next();
  };
};
