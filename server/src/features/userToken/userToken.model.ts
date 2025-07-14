import mongoose from "mongoose";
import { UserTokenDocument } from "./userToken.type";

const userTokenSchema = new mongoose.Schema<UserTokenDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: { type: String, enum: ["RESET_PASSWORD", "VERIFY_EMAIL"], required: true },
    token: { type: String, required: true, unique: true },

    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

userTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const UserToken = mongoose.model<UserTokenDocument>("UserToken", userTokenSchema);
