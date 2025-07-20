import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";

import { CreateWordFrequencyDTO, getWordFrequencyByWordIdDTO } from "./word.dto";

export type ToogleWordFrequencyHandler = ValidatedRequestHandler<
  getWordFrequencyByWordIdDTO,
  any,
  CreateWordFrequencyDTO,
  {}
>;
