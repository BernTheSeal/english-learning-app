import {
  ToggleSentenceLikeBodyDTO,
  ToggleSentenceLikeParamsDTO,
} from "./sentenceLike.dto";

import { ValidatedRequestHandler } from "../../types/ValidateRequestHandler";

export type ToggleSentenceLikeHandler = ValidatedRequestHandler<
  ToggleSentenceLikeParamsDTO,
  {},
  ToggleSentenceLikeBodyDTO,
  {}
>;
