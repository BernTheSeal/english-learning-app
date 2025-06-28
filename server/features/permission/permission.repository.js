import { Permission } from "./permission.model.js";

const create = async ({ name, description, isActive, isDeleteable, createdBy }) => {
  return await Permission.create({
    name,
    description,
    isActive,
    isDeleteable,
    createdBy,
  });
};

const deleteById = async (permissionId) => {
  return await Permission.findByIdAndDelete({ _id: permissionId });
};

const updateById = async (permissionId, updates) => {
  return await Permission.findByIdAndUpdate(permissionId, updates, {
    new: true,
    runValidators: true,
  });
};

const getById = async (permissionId) => {
  return await Permission.findById(permissionId);
};

const getByName = async (name) => {
  return await Permission.findOne({ name });
};

const existsById = async (permissionId) => {
  return await Permission.exists({ _id: permissionId });
};

const listByFilter = async (filter) => {
  return await Permission.find(filter);
};

export default {
  create,
  deleteById,
  updateById,
  getById,
  existsById,
  getByName,
  listByFilter,
};
