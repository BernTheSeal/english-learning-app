import sentenceService from "../services/sentence.service";
import wordService from "../../word/word.service";
import dictionaryService from "../../dictionary/dictionary.service";

import { sendSuccessResponse } from "../../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../../config/httpStatus";
import { CreateSentenceHandler } from "../types/sentence.type";

export const createSentence: CreateSentenceHandler = async (req, res, next) => {
  const { content, word, parentId } = req.validatedBody;
  console.log("PARENT_ID::", parentId);
  const userId = req.userId!;

  try {
    let wordFromDb = await wordService.getWordByName(word.toLowerCase());

    if (!wordFromDb) {
      const WordInfoFromDictionary = await dictionaryService.getWordOrThrow(
        word.toLowerCase()
      );

      const wordTypes = wordService.getWordType(WordInfoFromDictionary.meanings);

      wordFromDb = await wordService.findOrCreateWord({
        name: WordInfoFromDictionary.word,
        types: wordTypes,
      });
    }

    const newSentence = await sentenceService.createSentenceOrThrow({
      userId,
      wordId: wordFromDb._id,
      word,
      parentId,
      content,
    });

    sendSuccessResponse(
      res,
      "Sentences is successfully created.",
      HTTP_SUCCESS_STATUS.OK,
      { newSentence }
    );

    return;
  } catch (error) {
    next(error);
  }
};
