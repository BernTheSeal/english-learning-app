import mongoose from "mongoose";
import { WordFrequency } from "../models/wordFrequencymodel";
import { toggleWordFrequencyInput } from "../word.input";

const create = async ({ wordId, userId, point }: toggleWordFrequencyInput) => {
  await WordFrequency.create({
    wordId,
    userId,
    point,
  });
};

const deleteByIds = async (wordId: string, userId: string) => {
  await WordFrequency.deleteOne({
    wordId,
    userId,
  });
};

const updateByIds = async ({ wordId, userId, point }: toggleWordFrequencyInput) => {
  await WordFrequency.updateOne({ userId, wordId }, { $set: { point } });
};

const getByWordId = async (wordId: string) => {
  const [result] = await WordFrequency.aggregate([
    { $match: { wordId: new mongoose.Types.ObjectId(wordId) } },
    {
      $group: {
        _id: null,
        totalVoters: { $sum: 1 },
        averagePoint: { $avg: "$point" },
      },
    },
    {
      $project: {
        _id: 0,
        totalVoters: 1,
        averagePoint: {
          $round: ["$averagePoint", 1],
        },
      },
    },
  ]);

  return result ?? null;
};

const getByWordIdAndUserId = async (wordId: string, userId: string) => {
  return await WordFrequency.findOne({ userId, wordId });
};

export default { create, deleteByIds, updateByIds, getByWordId, getByWordIdAndUserId };
