import { Sentence } from "../models/sentence.model";
import { createSentenceInput, getSentencesInput } from "../types/sentence.type";
import { Types } from "mongoose";

const create = async ({
  userId,
  wordId,
  parentId,
  content,
}: Omit<createSentenceInput, "word">) => {
  return await Sentence.create({ userId, wordId, parentId, content });
};

const deleteById = async (id: Types.ObjectId) => {
  await Sentence.findByIdAndUpdate(id, { isDeleted: true });
};

const getById = async (id: Types.ObjectId) => {
  return await Sentence.findById(id);
};

const getAll = async ({ cursor, parentId }: getSentencesInput) => {
  let filteredParentId = parentId ?? null;

  let filter: any = { isDeleted: false, parentId: filteredParentId };
  const limit = 20;

  if (cursor) {
    filter._id = { $lt: cursor };
  }

  const sentences = await Sentence.find(filter).sort({ _id: -1 }).limit(limit);

  const nextCursor = sentences.length > 0 ? sentences[sentences.length - 1]._id : null;

  return {
    sentences,
    nextCursor,
    hasMore: sentences.length === limit,
  };
};

export default { create, getAll, deleteById, getById };
