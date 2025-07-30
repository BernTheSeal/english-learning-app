import { Handler } from "express";
import { sendSuccessResponse } from "../../shared/response";
import notificationService from "./notification.service";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import {
  GetNotificationByIdHandler,
  SendNotificationHandler,
} from "./notification.handler";

export const sendNotification: SendNotificationHandler = async (req, res, next) => {
  const { userId } = req.validatedParams;
  const { title, message } = req.validatedBody;

  try {
    await notificationService.sendCustomNotification({
      userId,
      title,
      message,
      type: "custom" as const,
      meta: null,
    });

    sendSuccessResponse(
      res,
      "Notification is successfully sent",
      HTTP_SUCCESS_STATUS.CREATED
    );

    return;
  } catch (error) {
    next(error);
  }
};

export const getAllNotifications: Handler = async (req, res, next) => {
  const userId = req.userId!;
  try {
    const notifications = await notificationService.getNotification(userId);

    sendSuccessResponse(
      res,
      "Notifications is successfully fetched.",
      HTTP_SUCCESS_STATUS.OK,
      { notifications }
    );
  } catch (error) {
    next(error);
  }
};

export const getNotificationById: GetNotificationByIdHandler = async (req, res, next) => {
  const { notificationId } = req.validatedParams;
  const userId = req.userId!;

  try {
    const notifications = await notificationService.getNotification(
      userId,
      notificationId
    );

    sendSuccessResponse(
      res,
      "Notifications is successfully fetched.",
      HTTP_SUCCESS_STATUS.OK,
      { notifications }
    );
  } catch (error) {
    next(error);
  }
};
