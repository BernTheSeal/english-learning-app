import { Types } from "mongoose";
import { ILikeCount } from "./sentence.type";

import {
  CreateSentenceBodyDTO,
  DeleteSentenceDTO,
  GetSentencesDTO,
  GetASentenceDTO,
} from "./sentence.dto";

export type createSentenceInput = CreateSentenceBodyDTO & {
  userId: string;
  wordId: Types.ObjectId;
};
export type deleteSenteceInput = DeleteSentenceDTO & { userId: string };
export type getSentencesInput = GetSentencesDTO;
export type getASentenceInput = GetASentenceDTO;

export type incrementCountInput = {
  sentenceId: Types.ObjectId;
  category: keyof ILikeCount;
  count: number;
};
