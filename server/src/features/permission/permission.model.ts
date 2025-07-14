import mongoose from "mongoose";
import { PermissionDocument } from "./permission.type";

const permissionSchema = new mongoose.Schema<PermissionDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
      default: true,
    },
    isDeleteable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Permission = mongoose.model<PermissionDocument>("Permission", permissionSchema);
