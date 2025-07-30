import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";
import {
  GetNotificationsDTO,
  SendNotificationDTO,
  CreateNotificationDTO,
} from "./notification.dto";

export type GetNotificationByIdHandler = ValidatedRequestHandler<
  GetNotificationsDTO,
  any,
  {},
  {}
>;

export type SendNotificationHandler = ValidatedRequestHandler<
  SendNotificationDTO,
  any,
  CreateNotificationDTO,
  {}
>;
