import dictionaryService from "./dictionary.service";
import { sendSuccessResponse } from "../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { GetWordFromDictionaryHandler } from "./dictionary.type";

export const getWordFromDictionary: GetWordFromDictionaryHandler = async (req, res, next) => {
  const { word } = req.validatedParams;

  try {
    const WordInfo = await dictionaryService.getWord(word);

    sendSuccessResponse(
      res,
      "The word was successfully retrieved from the dictionary.",
      HTTP_SUCCESS_STATUS.OK,
      { WordInfo }
    );

    return;
  } catch (error) {
    next(error);
  }
};
