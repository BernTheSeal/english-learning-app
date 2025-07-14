import { UserToken } from "./userToken.model";
import { UserTokenType } from "./userToken.type";
import { createUserToken } from "./userToken.type";

const create = async ({ userId, type, token, expiresAt }: createUserToken) => {
  await UserToken.create({
    userId,
    type,
    token,
    expiresAt,
  });
};

const deleteByUserId = async (userId: string) => {
  await UserToken.deleteMany({ userId });
};

const deleteByUserIdAndType = async (userId: string, type: UserTokenType) => {
  await UserToken.deleteMany({ userId, type });
};

const existsByUserIdAndType = async (userId: string, type: UserTokenType) => {
  return await UserToken.exists({ userId, type });
};

const getByUserIdAndType = async (userId: string, type: UserTokenType) => {
  return await UserToken.findOne({ userId, type });
};

const existsByTokenAndType = async (token: string, type: UserTokenType) => {
  return await UserToken.exists({ token, type });
};

const getByTokenAndType = async (token: string, type: UserTokenType) => {
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
