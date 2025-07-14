import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";
import { CreateSessionDTO } from "./session.dto";

export type CreateSessionHandler = ValidatedRequestHandler<{}, any, CreateSessionDTO, {}>;
