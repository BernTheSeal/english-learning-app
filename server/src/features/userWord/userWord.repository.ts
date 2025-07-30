import { createUserWordInput, idsInput } from "./userWord.input";
import { UserWord } from "./userWord.model";

const create = async ({ status, nextReviewAt, userId, wordId }: createUserWordInput) => {
  return await UserWord.create({
    userId,
    wordId,
    status,
    nextReviewAt: nextReviewAt ?? null,
  });
};

const getByUserId = async (userId: string) => {
  const userWord = await UserWord.find({ userId }, { _id: 0 }).populate("wordId", "name");

  const result = userWord
    .map((w) => {
      if (typeof w.wordId === "object" && w.wordId !== null && "name" in w.wordId) {
        return {
          _id: w.wordId._id,
          name: w.wordId.name,
          status: w.status,
          createdAt: w.createdAt,
        };
      }
    })
    .filter(Boolean);

  return result;
};

const getWordsReadyForStatusUpgrade = async (userId: string) => {
  const userWords = await UserWord.find(
    {
      $and: [
        { userId },
        { status: { $in: ["new", "learning"] } },
        { meaningViewSkippedCount: { $mod: [10, 0] } },
        { meaningViewSkippedCount: { $ne: 0 } },
      ],
    },
    { wordId: 1, status: 1, meaningViewSkippedCount: 1 }
  ).populate("wordId", "name");

  const result = userWords
    .map((wordDoc) => {
      if (
        typeof wordDoc.wordId === "object" &&
        wordDoc.wordId !== null &&
        "name" in wordDoc.wordId
      ) {
        return {
          _id: wordDoc._id,
          word: wordDoc.wordId.name,
          status: wordDoc.status,
          meaningViewSkippedCount: wordDoc.meaningViewSkippedCount,
        };
      }
    })
    .filter((w) => w !== undefined);

  return result;
};

const existsByIds = async ({ userId, wordId }: idsInput) => {
  const isExists = await UserWord.findOne({ userId, wordId });
  return !!isExists;
};

const bulkWrite = async (data: any) => {
  await UserWord.bulkWrite(data);
};

export default {
  create,
  getByUserId,
  getWordsReadyForStatusUpgrade,
  existsByIds,
  bulkWrite,
};
