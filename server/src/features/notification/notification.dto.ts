import z from "zod";

import {
  getNotificiationIdSchema,
  getUserIdSchema,
  createNotificationSchema,
} from "./notification.schema";

export type GetNotificationsDTO = z.infer<typeof getNotificiationIdSchema>;
export type SendNotificationDTO = z.infer<typeof getUserIdSchema>;
export type CreateNotificationDTO = z.infer<typeof createNotificationSchema>;
