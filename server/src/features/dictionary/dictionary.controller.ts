import dictionaryService from "./dictionary.service";
import wordService from "../word/word.service";
import { sendSuccessResponse } from "../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { GetWordFromDictionaryHandler } from "./dictionary.type";
import wordHistoryService from "../wordHistory/wordHistory.service";

export const getWordFromDictionary: GetWordFromDictionaryHandler = async (
  req,
  res,
  next
) => {
  const { word } = req.validatedParams;
  const userId = req.userId!;
  let wordFromDb;

  try {
    const WordInfoFromDictionary = await dictionaryService.getWordOrThrow(word);

    const wordType = wordService.getWordType(WordInfoFromDictionary.meanings);

    wordFromDb = await wordService.findOrCreateWord({ name: word, types: wordType });

    await wordHistoryService.createWordHistory(userId, wordFromDb._id.toString());

    const frequency = await wordService.getWordFrequencyByWordId(
      wordFromDb._id.toString(),
      userId
    );

    sendSuccessResponse(
      res,
      "The word was successfully retrieved from the dictionary.",
      HTTP_SUCCESS_STATUS.OK,
      {
        wordInfo: {
          _id: wordFromDb._id,
          ...WordInfoFromDictionary,
          frequency,
          first3k: wordFromDb.first3k,
          level: wordFromDb.level,
        },
      }
    );

    return;
  } catch (error) {
    next(error);
  }
};
