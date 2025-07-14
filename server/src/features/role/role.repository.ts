import { createRoleInput, filterRoleInput, updateRoleInput } from "./role.input";
import { Role } from "./role.model";

const create = async ({ name, description, isActive, isDeleteable, createdBy }: createRoleInput) => {
  return await Role.create({
    name,
    description,
    isActive,
    isDeleteable,
    createdBy,
  });
};

const deleteById = async (roleId: string) => {
  return await Role.findOneAndDelete({ _id: roleId });
};

const updateById = async (roleId: string, updates: updateRoleInput) => {
  return await Role.findByIdAndUpdate(roleId, updates, {
    new: true,
    runValidators: true,
  });
};

const getById = async (roleId: string) => {
  return await Role.findById(roleId);
};

const getByName = async (name: string) => {
  return await Role.findOne({ name });
};

const existsById = async (roleId: string) => {
  return await Role.exists({ _id: roleId });
};

const listByFilter = async (filter: filterRoleInput) => {
  return await Role.find(filter);
};

export default {
  create,
  deleteById,
  updateById,
  getById,
  getByName,
  existsById,
  listByFilter,
};
