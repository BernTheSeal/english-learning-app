import { Session } from "./session.model.js";

export const create = async (userId, refreshToken, expiresAt) => {
  return await Session.create({ userId, refreshToken, expiresAt });
};

export const deleteByUserId = async (userId) => {
  return await Session.deleteMany({ userId });
};

export const deleteById = async (id) => {
  return await Session.deleteOne({ _id: id });
};

export const getByUserId = async (userId) => {
  return await Session.findOne({ userId });
};

export default {
  create,
  deleteByUserId,
  deleteById,
  getByUserId,
};
