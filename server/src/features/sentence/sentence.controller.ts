import sentenceService from "./sentence.service";
import wordService from "../word/word.service";
import dictionaryService from "../dictionary/dictionary.service";

import { sendSuccessResponse } from "../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";

import {
  CreateSentenceHandler,
  DeleteSentenceHandler,
  GetSentencesHandler,
  GetASentenceHandler,
} from "./sentence.handler";

export const getSentences: GetSentencesHandler = async (req, res, next) => {
  const { cursor, parentId } = req.validatedQuery;
  try {
    const data = await sentenceService.getSentences({ cursor, parentId });
    sendSuccessResponse(
      res,
      "Sentences successfully fetched.",
      HTTP_SUCCESS_STATUS.OK,
      data
    );
    return;
  } catch (error) {
    next(error);
  }
};

export const getASentence: GetASentenceHandler = async (req, res, next) => {
  const { sentenceId } = req.validatedParams;
  try {
    const sentence = await sentenceService.getASentence({ sentenceId });
    sendSuccessResponse(res, "Sentence successfully fetched.", HTTP_SUCCESS_STATUS.OK, {
      sentence,
    });
    return;
  } catch (error) {}
};

export const createSentence: CreateSentenceHandler = async (req, res, next) => {
  const { content, word, parentId } = req.validatedBody;
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

export const deleteSentence: DeleteSentenceHandler = async (req, res, next) => {
  const { sentenceId } = req.validatedParams;
  const userId = req.userId!;

  try {
    await sentenceService.deleteSenteceOrThrow({ sentenceId, userId });
    sendSuccessResponse(res, "Sentence successfully deleted.", HTTP_SUCCESS_STATUS.OK);
    return;
  } catch (error) {
    next(error);
  }
};
