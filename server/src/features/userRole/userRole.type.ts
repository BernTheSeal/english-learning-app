import { UserDocument } from "../user/user.type";
import { RoleDocument } from "../role/role.type";
import { Document } from "mongoose";
import { Types } from "mongoose";
import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";
import { z } from "zod";
import { userRoleSchema } from "./userRole.schema";

export interface IUserRole {
  userId: string | UserDocument;
  roleId: string | RoleDocument;
}

export interface UserRoleDocument extends IUserRole, Document {
  _id: Types.ObjectId;
}

export type UserRoleDTO = z.infer<typeof userRoleSchema>;

export type UserRoleInput = UserRoleDTO;

export type UserRoleHandler = ValidatedRequestHandler<UserRoleDTO>;
