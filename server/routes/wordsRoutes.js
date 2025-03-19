const express = require('express');
const routes = express.Router();
const {
  getWordInfo,
  addWord,
  deleteWord,
  addHistoryWord,
} = require('../controllers/wordsController.js');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js');

routes.get('/words/:word', ensureAuthenticated, getWordInfo);
routes.post('/words/add', ensureAuthenticated, addWord);
routes.post('/words/delete', ensureAuthenticated, deleteWord);
routes.post('/words/addHistoryWord', ensureAuthenticated, addHistoryWord);

module.exports = routes;
