import { z } from "zod";
import { zodEmail, zodPassword } from "../../../shared/zod";

export const forgotPasswordSchema = z.object({ email: zodEmail }).strict();

export const resetPasswordSchema = z.object({ password: zodPassword }).strict();

export const resetPasswordTokenSchema = z
  .object({
    token: z
      .string({ required_error: "Reset password link required!" })
      .min(40, "Token must be at least 40 characters."),
  })
  .strict();

export const updatePasswordSchema = z
  .object({
    prevPassword: zodPassword,
    password: zodPassword,
    confirmPassword: zodPassword,
  })
  .strict();
