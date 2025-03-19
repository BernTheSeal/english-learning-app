const HTTP_STATUS = require('../constants/httpStatus.js');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper.js');
const axios = require('axios');
const User = require('../models/user.js');
const SavedWords = require('../models/savedWords.js');

const getWordInfo = async (req, res) => {
  try {
    const { word } = req.params;

    if (!word || word === '') {
      return sendErrorResponse(res, 'word is required.', HTTP_STATUS.BAD_REQUEST);
    }

    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    sendSuccessResponse(res, 'successfully fetch', HTTP_STATUS.OK, response.data);
  } catch (err) {
    if (err.response.status === 404) {
      return sendErrorResponse(res, 'word is not found', HTTP_STATUS.NOT_FOUND);
    }
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

const addWord = async (req, res) => {
  try {
    const { word, status } = req.body;

    if (!word || word === '') {
      return sendErrorResponse(res, 'word is required.', HTTP_STATUS.BAD_REQUEST);
    }

    let categories = [];

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const categoriesSet = new Set();

      response.data.forEach((wordData) => {
        wordData.meanings.forEach((meaning) => {
          if (meaning.partOfSpeech) {
            categoriesSet.add(meaning.partOfSpeech);
          }
        });
      });

      categories = Array.from(categoriesSet);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return sendErrorResponse(
          res,
          'Invalid word. Please choose a valid word.',
          HTTP_STATUS.BAD_REQUEST,
        );
      }
      return sendErrorResponse(
        res,
        'An error occurred. Please try again later.',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }

    if (!req.user) {
      return sendErrorResponse(res, 'Token is not found', HTTP_STATUS.UNAUTHORIZED);
    }

    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 'User is not found', HTTP_STATUS.UNAUTHORIZED);
    }

    let savedWords = await SavedWords.findOne({ userId });

    if (!savedWords) {
      savedWords = new SavedWords({ userId, words: [{ word, status, categories }] });
    } else {
      const wordExists = savedWords.words.some((w) => w.word === word);
      if (wordExists) {
        return sendErrorResponse(res, 'Word already exists.', HTTP_STATUS.CONFLICT);
      }
      savedWords.words.push({ word, status, categories });
    }

    savedWords.words.sort((a, b) => a.word.localeCompare(b.word));

    await savedWords.save();

    sendSuccessResponse(res, 'word is saved', HTTP_STATUS.CREATED);
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

const deleteWord = async (req, res) => {
  try {
    const { word } = req.body;

    if (!word || word === '') {
      return sendErrorResponse(res, 'word is required.', HTTP_STATUS.BAD_REQUEST);
    }

    if (!req.user) {
      return sendErrorResponse(res, 'Token is not found', HTTP_STATUS.UNAUTHORIZED);
    }

    const userId = req.user.userId;

    if (!userId) {
      return sendErrorResponse(res, 'Token is not found', HTTP_STATUS.UNAUTHORIZED);
    }

    const savedWords = await SavedWords.findOne({ userId });

    if (!savedWords) {
      return sendErrorResponse(res, 'No words found for this user.', HTTP_STATUS.NOT_FOUND);
    }

    const wordExists = savedWords.words.some((savedWord) => savedWord.word === word);

    if (!wordExists) {
      return sendErrorResponse(res, 'Word not found in saved list.', HTTP_STATUS.NOT_FOUND);
    }

    savedWords.words = savedWords.words.filter((w) => w.word !== word);

    await savedWords.save();

    return sendSuccessResponse(res, 'Word deleted successfully', HTTP_STATUS.OK);
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

module.exports = { getWordInfo, addWord, deleteWord };
