import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";

import {
  CreateSentenceBodyDTO,
  DeleteSentenceDTO,
  GetSentencesDTO,
  GetASentenceDTO,
} from "./sentence.dto";

export type CreateSentenceHandler = ValidatedRequestHandler<
  {},
  {},
  CreateSentenceBodyDTO,
  {}
>;
export type DeleteSentenceHandler = ValidatedRequestHandler<
  DeleteSentenceDTO,
  {},
  {},
  {}
>;

export type GetSentencesHandler = ValidatedRequestHandler<{}, {}, {}, GetSentencesDTO>;
export type GetASentenceHandler = ValidatedRequestHandler<GetASentenceDTO, {}, {}, {}>;
