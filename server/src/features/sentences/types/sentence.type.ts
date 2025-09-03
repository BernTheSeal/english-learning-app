import { Types, Document } from "mongoose";
import { IUser } from "../../user/user.type";
import { IWord } from "../../word/word.type";

import z from "zod";
import {
  createSentenceBodySchema,
  getSentencesSchema,
  deleteSentenceSchema,
  getASentenceSchema,
} from "../schemas/sentence.schema";

import { ValidatedRequestHandler } from "../../../types/ValidateRequestHandler";

export interface ISentence {
  userId: Types.ObjectId | IUser;
  wordId: Types.ObjectId | IWord;
  content: string;
  parentId?: Types.ObjectId | ISentence;
  isDeleted: boolean;
}

export type SentenceDocument = Document<Types.ObjectId, any, any> & ISentence;

export type CreateSentenceBodyDTO = z.infer<typeof createSentenceBodySchema>;
export type DeleteSentenceDTO = z.infer<typeof deleteSentenceSchema>;
export type GetSentencesDTO = z.infer<typeof getSentencesSchema>;
export type GetASentenceDTO = z.infer<typeof getASentenceSchema>;

export type createSentenceInput = CreateSentenceBodyDTO & {
  userId: string;
  wordId: Types.ObjectId;
};
export type deleteSenteceInput = DeleteSentenceDTO & { userId: string };
export type getSentencesInput = GetSentencesDTO;
export type getASentenceInput = GetASentenceDTO;

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
