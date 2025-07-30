import { createUserWordInput, idsInput, trackUserWordActivityInput } from "./userWord.input";
import { UserWordError } from "./userWord.error";
import { HTTP_ERROR_STATUS } from "../../config/httpStatus";

import wordRepository from "../word/repositories/word.repository";
import userWordRepository from "./userWord.repository";

const getUserWord = async (userId: string) => {
  return await userWordRepository.getByUserId(userId);
};

const createUserWord = async ({ userId, wordId, status, nextReviewAt }: createUserWordInput) => {
  const userWord = await userWordRepository.existsByIds({ userId, wordId });

  if (userWord) {
    throw new UserWordError("You have already saved this word before.", HTTP_ERROR_STATUS.CONFLICT);
  }
  await userWordRepository.create({ userId, wordId, status, nextReviewAt });
};

const trackUserWordActivity = async (words: trackUserWordActivityInput[], userId: string) => {
  const wordNames = words.map((word: trackUserWordActivityInput) => word.name);

  const wordDocs = await wordRepository.getMultipleByName(wordNames);

  const wordIdMap = new Map(wordDocs.map((doc) => [doc.name, doc._id]));

  const bulkOperations = words
    .map((word) => {
      const wordId = wordIdMap.get(word.name);
      if (!wordId) return null;
      const date = new Date();

      return {
        updateOne: {
          filter: { userId, wordId },
          update: {
            $inc: {
              reviewCount: 1,
              ...(word.viewMeaning ? {} : { meaningViewSkippedCount: 1 }),
            },
            $set: { lastReviewAt: date },
          },
        },
      };
    })
    .filter(Boolean);

  let updatedWords;
  if (bulkOperations.length > 0) {
    updatedWords = await userWordRepository.bulkWrite(bulkOperations);
  }

  return updatedWords;
};

export default { createUserWord, getUserWord, trackUserWordActivity };
