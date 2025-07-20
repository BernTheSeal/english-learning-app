import mongoose from "mongoose";
import { WordFrequencyDocument } from "../word.type";

const WordFrequencySchema = new mongoose.Schema<WordFrequencyDocument>({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  point: { type: Number, enum: [0, 1, 2, 3, 4, 5], required: true },
});

WordFrequencySchema.index({ wordId: 1, userId: 1 }, { unique: true });

export const WordFrequency = mongoose.model<WordFrequencyDocument>("WordFrequencyVote", WordFrequencySchema);
