import mongoose from "mongoose";
import { UserWordDocument } from "./userWord.type";

const userWordSchema = new mongoose.Schema<UserWordDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "learning", "familiar", "mastered"],
      required: true,
      default: "new",
    },
    reviewCount: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
    lastReviewAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    meaningViewSkippedCount: {
      type: Number,
      default: 0,
    },
    nextReviewAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userWordSchema.index({ userId: 1, wordId: 1 }, { unique: true });

export const UserWord = mongoose.model("UserWord", userWordSchema);
