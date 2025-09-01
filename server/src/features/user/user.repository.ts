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

const getByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const getByUsername = async (username: string) => {
  return await User.findOne({ username });
};

const getProfileById = async (userId: string) => {
  return await User.findById(userId).select("username createdAt lastLogin");
};

const getWithPasswordById = async (userId: string) => {
  return await User.findById(userId).select("+password");
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
  getWithPasswordById,
  getByEmail,
  getByUsername,
  getWithPasswordByEmail,
};
