import mongoose from "mongoose";
import { SentenceLikeDocument } from "./sentenceLike.type";

const sentenceLikeSchema = new mongoose.Schema<SentenceLikeDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sentenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sentence",
    },
    category: {
      type: String,
      enum: ["funny", "daily", "formal"],
    },
  },
  { timestamps: true }
);

sentenceLikeSchema.index({ sentenceId: 1, userId: 1 }, { unique: true });

export const SentenceLike = mongoose.model<SentenceLikeDocument>(
  "SentenceLike",
  sentenceLikeSchema
);
