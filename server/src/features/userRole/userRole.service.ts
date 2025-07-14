import { HTTP_ERROR_STATUS } from "../../config/httpStatus";

import UserRoleError from "./userRole.error";

import userRepository from "../user/user.repository";
import userRoleRepository from "./userRole.repository";
import roleRepository from "../role/role.repository";
import { UserRoleInput } from "./userRole.type";

const addRoleToUser = async ({ userId, roleId }: UserRoleInput) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new UserRoleError("User not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new UserRoleError("Role not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  if (!role.isActive) {
    throw new UserRoleError(
      `The '${role.name.toUpperCase()}' role is not active.`,
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  const isRoleAssigned = await userRoleRepository.getByIds(userId, roleId);

  if (isRoleAssigned) {
    throw new UserRoleError(
      `'${user.username.toUpperCase()}' already has this '${role.name.toUpperCase()}' role.`,
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  await userRoleRepository.create(userId, roleId);

  return { user, role };
};

const removeRoleFromUser = async ({ userId, roleId }: UserRoleInput) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new UserRoleError("User not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new UserRoleError("Role not found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const userHasRole = await userRoleRepository.getByIds(userId, roleId);
  if (!userHasRole) {
    throw new UserRoleError(
      `Cannot remove '${role.name.toUpperCase()}' role from '${user.username.toUpperCase()}' because they do not have it.`,
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  const userRoles = await userRoleRepository.getRolesByUserId(userId);

  if (userRoles.length === 1) {
    const singleRole = userRoles[0];
    const defaultRole = await roleRepository.getByName("user");

    if (!defaultRole) {
      throw new UserRoleError("'USER' role cannot found.", HTTP_ERROR_STATUS.BAD_REQUEST);
    }

    if (singleRole && typeof singleRole !== "string") {
      const singleRoleId = singleRole._id.toString();
      const defaultRoleId = defaultRole._id.toString();

      if (singleRoleId === defaultRoleId) {
        throw new UserRoleError(
          "'USER' role cannot be removed as it is the only role",
          HTTP_ERROR_STATUS.BAD_REQUEST
        );
      }
    }

    await userRoleRepository.create(userId, defaultRole._id.toString());
  }

  await userRoleRepository.deleteByIds(userId, roleId);

  return { role, user };
};

export default { addRoleToUser, removeRoleFromUser };
