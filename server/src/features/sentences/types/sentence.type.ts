import { Types, Document } from "mongoose";
import { IUser } from "../../user/user.type";
import { IWord } from "../../word/word.type";

import z from "zod";
import { createSentenceBodySchema } from "../schemas/sentence.schema";

import { ValidatedRequestHandler } from "../../../types/ValidateRequestHandler";

export interface ISentence {
  userId: Types.ObjectId | IUser;
  wordId: Types.ObjectId | IWord;
  content: string;
  parentId?: Types.ObjectId | ISentence;
}

export type SentenceDocument = Document<Types.ObjectId, any, any> & ISentence;

//DTO
export type CreateSentenceBodyDTO = z.infer<typeof createSentenceBodySchema>;

//Inputs
export type createSentenceInput = CreateSentenceBodyDTO & {
  userId: string;
  wordId: Types.ObjectId;
};

//RequestHandler
export type CreateSentenceHandler = ValidatedRequestHandler<
  {},
  {},
  CreateSentenceBodyDTO,
  {}
>;
