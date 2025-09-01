import { Types, Document } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  name: string;
  bio: string;
  level: "a1" | "a2" | "b1" | "b2" | "c1" | "c2" | "native";
  password: string;
  lastLogin: Date;
  isVerified: boolean;
}

export interface UserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
