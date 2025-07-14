import { UserDocument } from "../user/user.type";
import { Document } from "mongoose";

export interface ISession {
  userId: string | UserDocument;
  refreshToken: string;
  expiresAt: Date;
}

export interface SessionDocument extends ISession, Document {}
