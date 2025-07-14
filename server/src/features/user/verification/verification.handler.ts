import { ValidatedRequestHandler } from "../../../types/ValidateRequestHandler";

import { VerifyEmailDTO } from "./verification.dto";

export type VerifyEmailHandler = ValidatedRequestHandler<{}, any, VerifyEmailDTO, {}>;
