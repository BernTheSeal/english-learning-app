import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MAILTRAP_TOKEN) {
  throw new Error("MAILTRAP_TOKEN is not defined in environment variables");
}

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Berkant Ünal",
};
