import HTTP_STATUS from "../../../config/httpStatus.js";

import UserError from "./../user.error.js";

import roleRepository from "../../role/role.repository.js";
import userRoleRepository from "../../userRole/userRole.repository.js";
import userRepository from "../user.repository.js";

const getUsers = async ({ isVerified, role }) => {
  const filter = {};

  if (isVerified) {
    filter.isVerified = isVerified === "true";
  }

  if (role) {
    const roleDoc = await roleRepository.getByName(role);
    if (!roleDoc) {
      throw new UserError("The role does not exist.", HTTP_STATUS.BAD_REQUEST);
    }

    const users = await userRoleRepository.getUsersByRoleId(roleDoc._id);
    const userIds = users.map((user) => user.id);

    filter._id = { $in: userIds };
  }

  return await userRepository.listByFilter(filter);
};

const getUserById = async ({ userId, fullAccess }) => {
  let user;
  if (fullAccess) {
    user = await userRepository.getById(userId);
  } else {
    user = await userRepository.getProfileById(userId);
  }

  if (!user) {
    throw new UserError("User not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  let roles = [];
  if (fullAccess) {
    roles = await userRoleRepository.getRolesByUserId(userId);
  }

  return { user, roles };
};

export default { getUsers, getUserById };
