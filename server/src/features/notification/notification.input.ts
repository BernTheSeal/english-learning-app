import { INotification } from "./notification.type";
import { NotificationMetaMap } from "./notification.type";

export type createNotificationInput<T extends keyof NotificationMetaMap> = Omit<
  INotification<T>,
  "isSeen" | "isRead"
>;
