import mongoose from "mongoose";
import { WordHistoryDocument } from "./wordHistory.type";

const wordHistorySchema = new mongoose.Schema<WordHistoryDocument>({
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
  lastSearch: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const WordHistory = mongoose.model<WordHistoryDocument>(
  "WordHistory",
  wordHistorySchema
);
