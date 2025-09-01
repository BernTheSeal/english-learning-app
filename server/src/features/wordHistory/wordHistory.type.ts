import { IUser } from "../user/user.type";
import { IWord } from "../word/word.type";
import { Types, Document } from "mongoose";

export interface IWordHistory {
  userId: Types.ObjectId | IUser;
  wordId: Types.ObjectId | IWord;
  lastSearch: Date;
}

export interface WordHistoryDocument extends IWordHistory, Document {}
