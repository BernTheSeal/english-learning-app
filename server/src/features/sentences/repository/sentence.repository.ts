import { Sentence } from "../models/sentence.model";
import { createSentenceInput } from "../types/sentence.type";
import { Types } from "mongoose";

const create = async ({
  userId,
  wordId,
  parentId,
  content,
}: Omit<createSentenceInput, "word">) => {
  return await Sentence.create({ userId, wordId, parentId, content });
};

const getById = async (id: Types.ObjectId) => {
  return await Sentence.findById(id);
};

export default { create, getById };
