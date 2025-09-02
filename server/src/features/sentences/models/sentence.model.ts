import mongoose from "mongoose";
import { SentenceDocument } from "../types/sentence.type";

const sentenceSchema = new mongoose.Schema<SentenceDocument>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    wordId: {
      ref: "Word",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sentence",
      default: null,
    },
  },
  { timestamps: true }
);

export const Sentence = mongoose.model<SentenceDocument>("Sentence", sentenceSchema);
