import { RoleDocument } from "../role/role.type";
import { UserRole } from "./userRole.model";
import { UserRoleDocument } from "./userRole.type";

const create = async (userId: string, roleId: string) => {
  await UserRole.create({ userId, roleId });
};

const deleteByIds = async (userId: string, roleId: string) => {
  await UserRole.deleteOne({ userId, roleId });
};

const getByIds = async (userId: string, roleId: string) => {
  return await UserRole.findOne({ userId, roleId });
};

const existsByIds = async (userId: string, roleId: string) => {
  return await UserRole.exists({ userId, roleId });
};

const deleteRolesByUserId = async (userId: string) => {
  await UserRole.deleteMany({ userId });
};

const deleteUsersByRoleId = async (roleId: string) => {
  await UserRole.deleteMany({ roleId });
};

const getRolesByUserId = async (userId: string) => {
  const roles = await UserRole.find({ userId }).populate("roleId");
  return roles.map(({ roleId }) => roleId as RoleDocument);
};

const getUsersByRoleId = async (roleId: string) => {
  const users = await UserRole.find({ roleId }).populate("userId");
  return users.map(({ userId }) => userId);
};

export default {
  create,
  deleteByIds,
  getByIds,
  existsByIds,
  deleteRolesByUserId,
  deleteUsersByRoleId,
  getRolesByUserId,
  getUsersByRoleId,
};
