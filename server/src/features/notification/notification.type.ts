import { Types, Document } from "mongoose";
import { wordStatus } from "../userWord/userWord.type";

export type NotificationMetaMap = {
  custom: null;
  track: {
    _id: Types.ObjectId;
    word: string;
    status: wordStatus;
    meaningViewSkippedCount: number;
  }[];
};

export interface INotification<
  T extends keyof NotificationMetaMap = keyof NotificationMetaMap
> {
  userId: string | Types.ObjectId;
  type: T;
  title: string;
  message: string;
  isSeen: boolean;
  isRead: boolean;
  meta: NotificationMetaMap[T];
}

export interface NotificationDocument extends INotification, Document {
  _id: Types.ObjectId;
}
