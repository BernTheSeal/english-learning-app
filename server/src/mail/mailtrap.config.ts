import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { MailError } from "./Mail.error";
import { HTTP_ERROR_STATUS } from "../config/httpStatus";

dotenv.config();

if (!process.env.MAILTRAP_TOKEN) {
  throw new MailError("MAILTRAP_TOKEN is not defined in environment variables", HTTP_ERROR_STATUS.NOT_FOUND);
}

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Berkant Ünal",
};
