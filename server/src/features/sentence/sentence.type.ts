import { Types, Document } from "mongoose";
import { IUser } from "../user/user.type";
import { IWord } from "../word/word.type";

export interface ILikeCount {
  funny: number;
  daily: number;
  formal: number;
}

export interface ISentence {
  userId: Types.ObjectId | IUser;
  wordId: Types.ObjectId | IWord;
  content: string;
  parentId?: Types.ObjectId | ISentence;
  isDeleted: boolean;
  likeCount: ILikeCount;
}

export type SentenceDocument = Document<Types.ObjectId, any, any> & ISentence;
