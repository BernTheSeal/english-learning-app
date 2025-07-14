import { Document } from "mongoose";
import { UserDocument } from "../user/user.type";

export interface IPermission {
  name: string;
  description: string;
  createdBy: string | UserDocument;
  isActive: boolean;
  isDeleteable: boolean;
}

export interface PermissionDocument extends IPermission, Document {}
