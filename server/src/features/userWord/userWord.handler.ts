import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";

import { CreateUserWordDTO, TrackUserWordActivityDTO } from "./userWord.dto";

export type CreateUserWordHandler = ValidatedRequestHandler<{}, any, CreateUserWordDTO, {}>;

export type TrackUserWordActivityHandler = ValidatedRequestHandler<{}, any, TrackUserWordActivityDTO, {}>;
