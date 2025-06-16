import HTTP_STATUS from "../../config/httpStatus.js";

import { UserError } from "../../errors/userError.js";

import { User } from "../user/user.model.js";
import { UserRole } from "./userRole.model.js";
import { Role } from "../role/role.model.js";

const addRoleToUser = async ({ userId, roleId }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new UserError("User not found.", HTTP_STATUS.NOT_FOUND);
  }

  const role = await Role.findById(roleId);
  if (!role) {
    throw new UserError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }

  if (!role.isActive) {
    throw new UserError(
      `The '${role.name.toUpperCase()}' role is not active.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const isRoleAssigned = await UserRole.exists({ userId, roleId: role._id });

  if (isRoleAssigned) {
    throw new UserError(
      `'${user.username.toUpperCase()}' already has this '${role.name.toUpperCase()}' role.`
    );
  }

  await UserRole.create({
    userId,
    roleId: role._id,
  });

  return { user, role };
};

const removeRoleFromUser = async ({ userId, roleId }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new UserError("User not found.", HTTP_STATUS.NOT_FOUND);
  }

  const role = await Role.findById(roleId);
  if (!role) {
    throw new UserError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }

  const userHasRole = await UserRole.findOne({ userId, roleId });
  if (!userHasRole) {
    throw new UserError(
      `Cannot remove '${role.name.toUpperCase()}' role from '${user.username.toUpperCase()}' because they do not have it.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const userRoles = await UserRole.find({ userId });
  if (userRoles.length === 1) {
    const defaultRole = await Role.findOne({ name: "user" }).select("_id");
    if (String(userRoles[0].roleId) === String(defaultRole._id)) {
      throw new UserError(
        "'USER' role cannot be removed as it is the only role",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await UserRole.create({ userId, roleId: defaultRole._id });
  }

  await UserRole.deleteOne({ userId, roleId });

  return { role, user };
};

export default { addRoleToUser, removeRoleFromUser };
