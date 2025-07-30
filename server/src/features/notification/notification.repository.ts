import { createNotificationInput } from "./notification.input";
import { Notification } from "./notification.model";
import { NotificationMetaMap } from "./notification.type";

const create = async <T extends keyof NotificationMetaMap>({
  userId,
  type,
  title,
  message,
  meta,
}: createNotificationInput<T>) => {
  await Notification.create({
    userId,
    type,
    title,
    message,
    meta,
  });
};

const updateMetaById = async <T extends keyof NotificationMetaMap>(
  notificationId: string,
  meta: NotificationMetaMap[T]
) => {
  await Notification.updateOne({ _id: notificationId }, { $set: { meta } });
};

const getByUserIdAndNotificationId = async (userId: string, notificationId: string) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { $set: { isSeen: true, isRead: true } },
    { new: true }
  );
};

const getByUserId = async (userId: string) => {
  await Notification.updateMany({ userId }, { $set: { isSeen: true } });
  return await Notification.find({ userId });
};

const getTrackTypeByUserId = async (userId: string) => {
  return await Notification.findOne({ userId, type: "track" });
};

export default {
  create,
  getByUserIdAndNotificationId,
  getByUserId,
  updateMetaById,
  getTrackTypeByUserId,
};
