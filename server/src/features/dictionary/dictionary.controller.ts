import dictionaryService from "./dictionary.service";
import wordService from "../word/word.service";
import { sendSuccessResponse } from "../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { GetWordFromDictionaryHandler } from "./dictionary.type";

export const getWordFromDictionary: GetWordFromDictionaryHandler = async (req, res, next) => {
  const { word } = req.validatedParams;
  let wordFromDb;

  try {
    const WordInfoFromDictionary = await dictionaryService.getWordOrThrow(word);

    const wordType = wordService.getWordType(WordInfoFromDictionary);

    wordFromDb = await wordService.getWordByName(word);

    if (!wordFromDb) {
      wordFromDb = await wordService.createWord({ name: word, types: wordType });
    }

    const frequency = await wordService.getWordFrequencyByWordId(wordFromDb._id.toString());

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
