import mongoose from "mongoose";
import { WordDocument } from "../word.type";

const WordSchema = new mongoose.Schema<WordDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ["a1", "a2", "b1", "b2", "c1", "c2"],
      default: null,
    },

    first3k: { type: Boolean, default: null },
  },
  { timestamps: true }
);

export const Word = mongoose.model<WordDocument>("Word", WordSchema);
