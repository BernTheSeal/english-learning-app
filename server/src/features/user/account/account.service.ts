import { HTTP_ERROR_STATUS } from "../../../config/httpStatus";

import UserError from "../user.error";
import userPolicy from "../../../policies/user.policy";
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

const deleteUser = async ({ userIdFromToken, userId }: deleteUserInput) => {
  const userRoles = (await userRoleRepository.getRolesByUserId(userIdFromToken)) as RoleDocument[];

  const canDelete = userPolicy.canDeleteUser({
    requesterId: userIdFromToken,
    targetId: userId,
    roles: userRoles,
  });

  if (!canDelete.allowed) {
    throw new UserError(
      canDelete.reason ?? "You do not have the necessary permissions to delete the user.",
      HTTP_ERROR_STATUS.CONFLICT
    );
  }

  await userRoleRepository.deleteRolesByUserId(userId);
  await userRepository.deleteById(userId);

  return userIdFromToken === userId;
};

export default { createUser, deleteUser };
