import mongoose from "mongoose";
import { RoleDocument } from "./role.type";

const roleSchema = new mongoose.Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      requried: true,
      default: true,
    },
    isDeleteable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Role = mongoose.model<RoleDocument>("Role", roleSchema);
