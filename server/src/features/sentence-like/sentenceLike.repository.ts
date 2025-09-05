import { SentenceLike } from "./sentenceLike.model";

import { toggleLikeInput } from "./sentenceLike.input";

const create = async ({ userId, sentenceId, category }: toggleLikeInput) => {
  return await SentenceLike.create({ userId, sentenceId, category });
};

const update = async ({ userId, sentenceId, category }: toggleLikeInput) => {
  return await SentenceLike.updateOne({ sentenceId, userId }, { $set: { category } });
};

const deleteByIds = async ({ userId, sentenceId }: Omit<toggleLikeInput, "category">) => {
  return await SentenceLike.deleteOne({ userId, sentenceId });
};

const getByUserIdAndSentenceId = async ({
  userId,
  sentenceId,
}: Omit<toggleLikeInput, "category">) => {
  return await SentenceLike.findOne({ userId, sentenceId });
};

export default { create, update, deleteByIds, getByUserIdAndSentenceId };
