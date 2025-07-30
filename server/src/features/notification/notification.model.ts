import mongoose from "mongoose";
import { NotificationDocument } from "./notification.type";

const NotificationSchema = new mongoose.Schema<NotificationDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["custom", "comment", "like", "track", "word"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<NotificationDocument>(
  "notification",
  NotificationSchema
);
