import HTTP_STATUS from "../../../config/httpStatus.js";

import UserError from "../user.error.js";

import userRepository from "../user.repository.js";
import userRoleRepository from "../../userRole/userRole.repository.js";

import { hashPassword } from "../../../shared/crypto/index.js";

const createUser = async ({ email, password, username }) => {
  const isExists = await userRepository.getByEmail(email);
  if (isExists) {
    throw new UserError(
      "User already exists with this email adress.",
      HTTP_STATUS.CONFLICT
    );
  }
  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create(email, hashedPassword, username);
  return user;
};

const deleteUser = async ({ user, userId, fullAccess }) => {
  if (!fullAccess) {
    if (!user._id.equals(userId)) {
      throw new UserError(
        "You do not have permission to delete the user.",
        HTTP_STATUS.FORBIDDEN
      );
    }
  }

  const userRoles = await userRoleRepository.getRolesByUserId(userId);
  const isAdmin = userRoles.some((role) => role.name === "admin");
  if (isAdmin) {
    if ("admin") throw new UserError("Admin cannot be deleted.", HTTP_STATUS.FORBIDDEN);
  }

  await userRoleRepository.deleteRolesByUserId(userId);
  await userRepository.deleteById(userId);
};

export default { createUser, deleteUser };
