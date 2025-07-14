import { Document, Types } from "mongoose";
import { UserDocument } from "../user/user.type";

export interface IRole {
  name: string;
  description: string;
  createdBy: string | UserDocument;
  isActive: boolean;
  isDeleteable: boolean;
}

export interface RoleDocument extends IRole, Document {
  _id: Types.ObjectId;
}
