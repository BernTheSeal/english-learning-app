import { HTTP_ERROR_STATUS } from "../../../config/httpStatus";

import UserError from "../user.error";

import roleRepository from "../../role/role.repository";
import userRoleRepository from "../../userRole/userRole.repository";
import userRepository from "../user.repository";
import { getUsersInput } from "./query.input";
import { RoleDocument } from "../../role/role.type";
import { UserDocument } from "../user.type";

const getMe = async (userId: string) => {
  const me = await userRepository.getById(userId);
  if (!me) {
    throw new UserError("We can't find you!", HTTP_ERROR_STATUS.NOT_FOUND);
  }
  return me;
};

const getUsers = async ({ isVerified, role }: getUsersInput) => {
  type filterType = getUsersInput & { _id?: any };
  const filter: filterType = {};

  if (isVerified) {
    filter.isVerified = isVerified;
  }

  if (role) {
    const roleDoc = await roleRepository.getByName(role);
    if (!roleDoc) {
      throw new UserError("The role does not exist.", HTTP_ERROR_STATUS.BAD_REQUEST);
    }

    const users = (await userRoleRepository.getUsersByRoleId(String(roleDoc._id))) as UserDocument[];
    const userIds = users.map((user) => user._id);

    filter._id = { $in: userIds };
  }

  return await userRepository.listByFilter(filter);
};

const getUserById = async ({ userId, fullAccess }: { userId: string; fullAccess: boolean }) => {
  let user;
  if (fullAccess) {
    user = await userRepository.getById(userId);
  } else {
    user = await userRepository.getProfileById(userId);
  }

  if (!user) {
    throw new UserError("User not found with the provided ID.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  let roles: RoleDocument[] = [];
  if (fullAccess) {
    roles = (await userRoleRepository.getRolesByUserId(userId)) as RoleDocument[];
  }

  return { user, roles };
};

export default { getMe, getUsers, getUserById };
