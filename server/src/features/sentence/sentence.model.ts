import mongoose from "mongoose";
import { SentenceDocument, ILikeCount } from "./sentence.type";

const likeCountSchema = new mongoose.Schema<ILikeCount>(
  {
    funny: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    formal: { type: Number, default: 0 },
  },
  { _id: false }
);

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
    likeCount: { type: likeCountSchema, default: () => ({}) },
  },
  { timestamps: true }
);

sentenceSchema.index({ wordId: 1, parentId: 1, userId: 1 });

export const Sentence = mongoose.model<SentenceDocument>("Sentence", sentenceSchema);
