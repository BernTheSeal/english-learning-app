import { Types, Document } from "mongoose";
import { IUser } from "../user/user.type";
import { ISentence } from "../sentence/sentence.type";

export interface ISentenceLike {
  userId: Types.ObjectId | IUser;
  sentenceId: Types.ObjectId | ISentence;
  category: "funny" | "daily" | "formal";
}

export type SentenceLikeDocument = Document<Types.ObjectId, any, any> & ISentenceLike;
