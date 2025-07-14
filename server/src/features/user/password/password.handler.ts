import { ValidatedRequestHandler } from "../../../types/ValidateRequestHandler";

import {
  ForgotPasswordDTO,
  ResetPasswordTokenDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
} from "./password.dto";

export type ForgotPasswordHandler = ValidatedRequestHandler<{}, any, ForgotPasswordDTO, {}>;

export type ResetPasswordHandler = ValidatedRequestHandler<ResetPasswordTokenDTO, any, ResetPasswordDTO, {}>;

export type UpdatePasswordHandler = ValidatedRequestHandler<{}, any, UpdatePasswordDTO, {}>;
