import mongoose from "mongoose";
import { UserRoleDocument } from "./userRole.type";

const userRoleSchema = new mongoose.Schema<UserRoleDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

export const UserRole = mongoose.model<UserRoleDocument>("UserRole", userRoleSchema);
