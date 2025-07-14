import { HTTP_ERROR_STATUS } from "../../../config/httpStatus";

import UserError from "../user.error";

import userRepository from "../user.repository";
import userRoleRepository from "../../userRole/userRole.repository";

import { hashPassword } from "../../../shared/crypto/index";
import { RoleDocument } from "../../role/role.type";
import { createUserInput, deleteUserInput } from "./account.input";

const createUser = async ({ email, password, username }: createUserInput) => {
  const isExists = await userRepository.getByEmail(email);
  if (isExists) {
    throw new UserError("User already exists with this email adress.", HTTP_ERROR_STATUS.CONFLICT);
  }
  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create({ email, password: hashedPassword, username });
  return user;
};

const deleteUser = async ({ userIdToken, userId, fullAccess }: deleteUserInput) => {
  if (!fullAccess) {
    if (userId !== userIdToken) {
      throw new UserError("You do not have permission to delete the user.", HTTP_ERROR_STATUS.FORBIDDEN);
    }
  }

  const userRoles = (await userRoleRepository.getRolesByUserId(userIdToken)) as RoleDocument[];
  const isAdmin = userRoles.some((role) => role.name === "admin");
  if (isAdmin) {
    throw new UserError("Admin cannot be deleted.", HTTP_ERROR_STATUS.FORBIDDEN);
  }

  await userRoleRepository.deleteRolesByUserId(userIdToken);
  await userRepository.deleteById(userIdToken);
};

export default { createUser, deleteUser };
