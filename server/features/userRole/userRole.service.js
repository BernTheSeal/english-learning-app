import HTTP_STATUS from "../../config/httpStatus.js";

import UserRoleError from "./userRole.error.js";

import userRepository from "../user/user.repository.js";
import userRoleRepository from "./userRole.repository.js";
import roleRepository from "../role/role.repository.js";

const addRoleToUser = async ({ userId, roleId }) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new UserRoleError("User not found.", HTTP_STATUS.NOT_FOUND);
  }

  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new UserRoleError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }

  if (!role.isActive) {
    throw new UserRoleError(
      `The '${role.name.toUpperCase()}' role is not active.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const isRoleAssigned = await userRoleRepository.getByIds(userId, roleId);

  if (isRoleAssigned) {
    throw new UserRoleError(
      `'${user.username.toUpperCase()}' already has this '${role.name.toUpperCase()}' role.`
    );
  }

  await userRoleRepository.create(userId, roleId);

  return { user, role };
};

const removeRoleFromUser = async ({ userId, roleId }) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new UserRoleError("User not found.", HTTP_STATUS.NOT_FOUND);
  }

  const role = await roleRepository.getById(roleId);
  if (!role) {
    throw new UserRoleError("Role not found.", HTTP_STATUS.NOT_FOUND);
  }

  const userHasRole = await userRoleRepository.getByIds(userId, roleId);
  if (!userHasRole) {
    throw new UserRoleError(
      `Cannot remove '${role.name.toUpperCase()}' role from '${user.username.toUpperCase()}' because they do not have it.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const userRoles = await userRoleRepository.getRolesByUserId(userId);
  if (userRoles.length === 1) {
    const defaultRole = await roleRepository.getByName("user");

    if (String(userRoles[0]._id) === String(defaultRole._id)) {
      throw new UserRoleError(
        "'USER' role cannot be removed as it is the only role",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await userRoleRepository.create(userId, defaultRole._id);
  }

  await userRoleRepository.deleteByIds(userId, roleId);

  return { role, user };
};

export default { addRoleToUser, removeRoleFromUser };
