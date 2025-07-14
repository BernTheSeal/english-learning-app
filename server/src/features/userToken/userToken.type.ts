import { Types, Document } from "mongoose";
import { UserDocument } from "../user/user.type";

export interface IUserToken {
  userId: string | UserDocument;
  type: UserTokenType;
  token: string;
  expiresAt: Date;
}

export interface UserTokenDocument extends IUserToken, Document {
  _id: Types.ObjectId;
}

export type UserTokenType = "RESET_PASSWORD" | "VERIFY_EMAIL";

export type createUserToken = {
  userId: string;
  type: UserTokenType;
  token: string;
  expiresAt: Date;
};
