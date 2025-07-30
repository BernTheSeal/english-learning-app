import express, { RequestHandler } from "express";

import {
  getNotificationById,
  sendNotification,
  getAllNotifications,
} from "./notification.controller";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  getNotificiationIdSchema,
  getUserIdSchema,
  createNotificationSchema,
} from "./notification.schema";

const router = express.Router();

router.post(
  "/:userId",
  validateRequest({ params: getUserIdSchema, body: createNotificationSchema }),
  sendNotification as unknown as RequestHandler
);

router.get(
  "/:notificationId",
  validateRequest({ params: getNotificiationIdSchema }),
  checkAccessToken,
  getNotificationById as unknown as RequestHandler
);
router.get("/", checkAccessToken, getAllNotifications);

export default router;
