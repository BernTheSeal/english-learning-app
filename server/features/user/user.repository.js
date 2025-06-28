import { User } from "./user.model.js";

const create = async (email, password, username) => {
  return await User.create({
    email,
    password,
    username,
  });
};

const deleteById = async (userId) => {
  await User.deleteOne({ _id: userId });
};

const updateUserPasswordById = async (userId, password) => {
  await User.updateOne({ _id: userId }, { $set: { password } });
};

const updateById = async (userId, field) => {
  await User.updateOne({ _id: userId }, { $set: field });
};

const listByFilter = async (filter) => {
  return await User.find(filter);
};

const getById = async (userId) => {
  return await User.findById(userId);
};

const getProfileById = async (userId) => {
  return await User.findById(userId).select("username createdAt lastLogin");
};

const existsById = async (userId) => {
  return await User.exists({ _id: userId });
};

const getWithPasswordById = async (userId) => {
  return await User.findById(userId).select("+password");
};

const getByEmail = async (email) => {
  return await User.findOne({ email });
};

const existsByEmail = async (email) => {
  return await User.exists({ email });
};

const getWithPasswordByEmail = async (email) => {
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
