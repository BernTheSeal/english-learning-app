import { RolePermission } from "./rolePermission.model";

const create = async (roleId: string, permissionId: string) => {
  await RolePermission.create({ roleId, permissionId });
};

const deleteByIds = async (roleId: string, permissionId: string) => {
  await RolePermission.deleteOne({ roleId, permissionId });
};

const existsByIds = async (roleId: string, permissionId: string) => {
  return await RolePermission.exists({ roleId, permissionId });
};

const deletePermissionsByRoleId = async (roleId: string) => {
  await RolePermission.deleteMany({ roleId });
};

const deleteRolesByPermissionId = async (permissionId: string) => {
  await RolePermission.deleteMany({ permissionId });
};

const getPermissionsByRoleId = async (roleId: string) => {
  const permissions = await RolePermission.find({ roleId }).populate("permissionId");
  return permissions.map(({ permissionId }) => permissionId);
};

const getRolesByPermissionId = async (permissionId: string) => {
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
