import { Permission } from "./permission.model";
import { FilterPermissionInput, CreatePermissionInput, UpdatePermissionInput } from "./permission.input";

const create = async ({ name, description, isActive, isDeleteable, createdBy }: CreatePermissionInput) => {
  return await Permission.create({
    name,
    description,
    isActive,
    isDeleteable,
    createdBy,
  });
};

const deleteById = async (permissionId: string) => {
  return await Permission.findByIdAndDelete({ _id: permissionId });
};

const updateById = async (permissionId: string, updates: UpdatePermissionInput) => {
  return await Permission.findByIdAndUpdate(permissionId, updates, {
    new: true,
    runValidators: true,
  });
};

const getById = async (permissionId: string) => {
  return await Permission.findById(permissionId);
};

const getByName = async (name: string) => {
  return await Permission.findOne({ name });
};

const existsById = async (permissionId: string) => {
  return await Permission.exists({ _id: permissionId });
};

const listByFilter = async (filter: FilterPermissionInput) => {
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
