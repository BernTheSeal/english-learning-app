import { Types, Document } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  lastLogin: Date;
  isVerified: boolean;
}

export interface UserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
