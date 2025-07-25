import { Types, Document } from "mongoose";
import { IWord, WordDocument } from "../word/word.type";

type wordStatus = "new" | "learning" | "familiar" | "mastered";

interface IUserWord {
  userId: Types.ObjectId;
  wordId: Types.ObjectId | WordDocument;
  status: wordStatus;
  reviewCount: number;
  lastReviewAt: Date;
  meaningViewSkippedCount: number;
  nextReviewAt: Date;
}

export interface UserWordDocument extends IUserWord, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
