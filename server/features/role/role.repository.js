import { Role } from "./role.model.js";

const create = async ({ name, description, isActive, isDeleteable, createdBy }) => {
  return await Role.create({
    name,
    description,
    isActive,
    isDeleteable,
    createdBy,
  });
};

const deleteById = async (roleId) => {
  return await Role.findOneAndDelete({ _id: roleId });
};

const updateById = async (roleId, updates) => {
  return await Role.findByIdAndUpdate(roleId, updates, {
    new: true,
    runValidators: true,
  });
};

const getById = async (roleId) => {
  return await Role.findById(roleId);
};

const getByName = async (name) => {
  return await Role.findOne({ name });
};

const existsById = async (roleId) => {
  return await Role.exists({ _id: roleId });
};

const listByFilter = async (filter) => {
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
