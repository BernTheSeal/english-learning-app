import { HTTP_ERROR_STATUS } from "../../config/httpStatus";
import wordRepository from "./repositories/word.repository";
import wordFrequencyRepository from "./repositories/wordFrequency.repository";
import { WordError } from "./word.error";
import { createWordInput } from "./word.input";
import { toggleWordFrequencyInput } from "./word.input";

const createWord = async ({ name, level, first3k }: createWordInput) => {
  return await wordRepository.create({ name, level, first3k });
};

const getWordByName = async (name: string) => {
  return await wordRepository.getByName(name);
};

const toggleWordFrequency = async ({ wordId, userId, point }: toggleWordFrequencyInput) => {
  const isExists = await wordRepository.getById(wordId);
  if (!isExists) {
    throw new WordError("The requested word could not be found.", HTTP_ERROR_STATUS.NOT_FOUND);
  }

  const userVote = await wordFrequencyRepository.getByWordIdAndUserId(wordId, userId);
  if (userVote) {
    if (userVote.point === point) {
      await wordFrequencyRepository.deleteByIds(wordId, userId);
    } else {
      await wordFrequencyRepository.updateByIds({ wordId, userId, point });
    }
  } else {
    await wordFrequencyRepository.create({ wordId, userId, point });
  }
};

const getWordFrequencyByWordId = async (wordId: string) => {
  return await wordFrequencyRepository.getByWordId(wordId);
};

export default { createWord, getWordByName, getWordFrequencyByWordId, toggleWordFrequency };
