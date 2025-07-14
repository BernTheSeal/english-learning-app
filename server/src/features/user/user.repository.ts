import { getUsersInput } from "./query/query.input";
import { createUserInput } from "./account/account.input";
import { User } from "./user.model";

const create = async ({ email, password, username }: createUserInput) => {
  return await User.create({
    email,
    password,
    username,
  });
};

const deleteById = async (userId: string) => {
  await User.deleteOne({ _id: userId });
};

const updateUserPasswordById = async (userId: string, password: string) => {
  await User.updateOne({ _id: userId }, { $set: { password } });
};

const updateById = async (userId: string, field: any) => {
  await User.updateOne({ _id: userId }, { $set: field });
};

const listByFilter = async (filter: getUsersInput) => {
  return await User.find(filter);
};

const getById = async (userId: string) => {
  return await User.findById(userId);
};

const getProfileById = async (userId: string) => {
  return await User.findById(userId).select("username createdAt lastLogin");
};

const existsById = async (userId: string) => {
  return await User.exists({ _id: userId });
};

const getWithPasswordById = async (userId: string) => {
  return await User.findById(userId).select("+password");
};

const getByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const existsByEmail = async (email: string) => {
  return await User.exists({ email });
};

const getWithPasswordByEmail = async (email: string) => {
  return await User.findOne({ email }).select("+password");
};

export default {
  create,
  deleteById,
  updateById,
  updateUserPasswordById,
  listByFilter,
  getById,
  getProfileById,
  existsById,
  getWithPasswordById,
  getByEmail,
  existsByEmail,
  getWithPasswordByEmail,
};
