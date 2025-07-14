import { z } from "zod";

import {
  forgotPasswordSchema,
  resetPasswordSchema,
  resetPasswordTokenSchema,
  updatePasswordSchema,
} from "./password.schema";

export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordTokenDTO = z.infer<typeof resetPasswordTokenSchema>;

export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;
