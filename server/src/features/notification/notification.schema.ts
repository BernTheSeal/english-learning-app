import z from "zod";
import { zodMongoId } from "../../shared/zod";

export const getNotificiationIdSchema = z
  .object({
    notificationId: zodMongoId.optional(),
  })
  .strict();

export const getUserIdSchema = z
  .object({
    userId: zodMongoId,
  })
  .strict();

export const createNotificationSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(30, { message: "Title must be at most 30 characters long" }),

    message: z
      .string()
      .min(1, { message: "Message is required" })
      .max(300, { message: "Message must be at most 300 characters long" }),
  })
  .strict();
