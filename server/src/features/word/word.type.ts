import { Document, Types } from "mongoose";

export interface IWord {
  name: string;
  level: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
  types: String[];
  first3k: boolean;
}

export interface WordDocument extends IWord, Document {
  _id: Types.ObjectId;
}

export interface IWordFrequency {
  name: string | Types.ObjectId;
  wordId: Types.ObjectId;
  userId: Types.ObjectId;
  point: number;
}

export interface WordFrequencyDocument extends IWordFrequency, Document {}
