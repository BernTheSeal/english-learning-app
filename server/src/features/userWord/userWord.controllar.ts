import wordService from "../word/word.service";
import dictionaryService from "../dictionary/dictionary.service";
import userWordService from "./userWordService";

import { CreateUserWordHandler, TrackUserWordActivityHandler } from "./userWord.handler";
import { sendSuccessResponse } from "../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { Handler } from "express";

export const getUserWords: Handler = async (req, res, next) => {
  const userId = req.userId!;

  try {
    const userWords = await userWordService.getUserWord(userId);

    sendSuccessResponse(res, "User words fetched successfully.", HTTP_SUCCESS_STATUS.OK, {
      words: userWords,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserWord: CreateUserWordHandler = async (req, res, next) => {
  const { nextReviewAt, status, word } = req.validatedBody;
  const userId = req.userId!;
  let wordId;

  try {
    const wordFromPool = await wordService.getWordByName(word);

    if (wordFromPool) {
      wordId = wordFromPool._id;
    } else {
      const WordInfoFromDictionary = await dictionaryService.getWordOrThrow(word);
      const wordTypes = wordService.getWordType(WordInfoFromDictionary);
      const createdWord = await wordService.createWord({ name: word, types: wordTypes });
      wordId = createdWord._id;
    }

    await userWordService.createUserWord({ userId, wordId, status, nextReviewAt });

    sendSuccessResponse(res, "Word saved and added to your list.", HTTP_SUCCESS_STATUS.CREATED);
    return;
  } catch (error) {
    next(error);
  }
};

export const trackUserWordActivity: TrackUserWordActivityHandler = async (req, res, next) => {
  const { words } = req.validatedBody;
  const userId = req.userId!;

  try {
    await userWordService.trackUserWordActivity(words, userId);

    sendSuccessResponse(res, "User word activity tracked successfully.", HTTP_SUCCESS_STATUS.OK);

    return;
  } catch (error) {
    next(error);
  }
};
