import { RolePermission } from "./rolePermission.model.js";

const create = async (roleId, permissionId) => {
  await RolePermission.create({ roleId, permissionId });
};

const deleteByIds = async (roleId, permissionId) => {
  await RolePermission.deleteOne({ roleId, permissionId });
};

const existsByIds = async (roleId, permissionId) => {
  return await RolePermission.exists({ roleId, permissionId });
};

const deletePermissionsByRoleId = async (roleId) => {
  await RolePermission.deleteMany({ roleId });
};

const deleteRolesByPermissionId = async (permissionId) => {
  await RolePermission.deleteMany({ permissionId });
};

const getPermissionsByRoleId = async (roleId) => {
  const permissions = await RolePermission.find({ roleId }).populate("permissionId");
  return permissions.map(({ permissionId }) => permissionId);
};

const getRolesByPermissionId = async (permissionId) => {
  const roles = await RolePermission.find({ permissionId }).populate("roleId");
  return roles.map(({ roleId }) => roleId);
};

export default {
  create,
  deleteByIds,
  existsByIds,
  deletePermissionsByRoleId,
  deleteRolesByPermissionId,
  getPermissionsByRoleId,
  getRolesByPermissionId,
};
