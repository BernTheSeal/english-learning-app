import { Session } from "./session.model";

export const create = async (userId: string, refreshToken: string, expiresAt: Date) => {
  return await Session.create({ userId, refreshToken, expiresAt });
};

export const deleteByUserId = async (userId: string) => {
  return await Session.deleteMany({ userId });
};

export const getByUserId = async (userId: string) => {
  return await Session.findOne({ userId });
};

export default {
  create,
  deleteByUserId,
  getByUserId,
};
