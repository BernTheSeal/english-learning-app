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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

sentenceSchema.index({ parentId: 1 });

export const Sentence = mongoose.model<SentenceDocument>("Sentence", sentenceSchema);
