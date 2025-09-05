import {
  ToggleSentenceLikeBodyDTO,
  ToggleSentenceLikeParamsDTO,
} from "./sentenceLike.dto";

export type toggleLikeInput = ToggleSentenceLikeBodyDTO &
  ToggleSentenceLikeParamsDTO & { userId: string };
