import { UserToken } from "./userToken.model.js";

const create = async ({ userId, type, token, expiresAt }) => {
  await UserToken.create({
    userId,
    type,
    token,
    expiresAt,
  });
};

const deleteByUserId = async (userId) => {
  await UserToken.deleteMany({ userId });
};

const deleteByUserIdAndType = async (userId, type) => {
  await UserToken.deleteMany({ userId, type });
};

const existsByUserIdAndType = async (userId, type) => {
  return await UserToken.exists({ userId, type });
};

const getByUserIdAndType = async (userId, type) => {
  return await UserToken.findOne({ userId, type });
};

const existsByTokenAndType = async (token, type) => {
  return await UserToken.exists({ token, type });
};

const getByTokenAndType = async (token, type) => {
  return await UserToken.findOne({ token, type });
};

export default {
  create,
  existsByUserIdAndType,
  deleteByUserId,
  deleteByUserIdAndType,
  existsByTokenAndType,
  getByUserIdAndType,
  getByTokenAndType,
};
