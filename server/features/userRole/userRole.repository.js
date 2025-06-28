import { UserRole } from "./userRole.model.js";

const create = async (userId, roleId) => {
  await UserRole.create({ userId, roleId });
};

const deleteByIds = async (userId, roleId) => {
  await UserRole.deleteOne({ userId, roleId });
};

const getByIds = async (userId, roleId) => {
  return await UserRole.findOne({ userId, roleId });
};

const existsByIds = async (userId, roleId) => {
  return await UserRole.exists({ userId, roleId });
};

const deleteRolesByUserId = async (userId) => {
  await UserRole.deleteMany({ userId });
};

const deleteUsersByRoleId = async (roleId) => {
  await UserRole.deleteMany({ roleId });
};

const getRolesByUserId = async (userId) => {
  const roles = await UserRole.find({ userId }).populate("roleId");
  return roles.map(({ roleId }) => roleId);
};

const getUsersByRoleId = async (roleId) => {
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
