import { WordHistory } from "./wordHistory.model";
import wordHistoryRepository from "./wordHistory.repository";

export const createWordHistory = async (userId: string, wordId: string) => {
  const wordHistory = await wordHistoryRepository.getWordHistoryByIds(userId, wordId);

  if (wordHistory) {
    wordHistory.lastSearch = new Date();
    await wordHistory.save();
  } else {
    await wordHistoryRepository.create(userId, wordId);
  }
};

export const getWordHistory = async (userId?: string) => {
  if (userId) {
    return await wordHistoryRepository.getWordHistoryByUserId(userId);
  } else {
    return await wordHistoryRepository.getWordHistory();
  }
};

export default { createWordHistory, getWordHistory };
