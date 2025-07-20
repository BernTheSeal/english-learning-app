import { Document, Types } from "mongoose";

export interface IWord {
  name: string;
  level: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
  first3k: boolean;
}

export interface IWordFrequency {
  userId: string | Types.ObjectId;
  wordId: string | Types.ObjectId;
  point: number;
}

export interface WordDocument extends IWord, Document {
  _id: Types.ObjectId;
}

export interface WordFrequencyDocument extends IWordFrequency, Document {}
