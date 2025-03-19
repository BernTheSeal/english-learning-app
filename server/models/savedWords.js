const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  status: {
    type: String,
    enum: ['justLearned', 'alreadyLearned'],
    default: 'justLearned',
  },
  learnedAt: { type: Date, default: Date.now },
  categories: {
    type: [String],
    enum: ['noun', 'verb', 'adjective', 'adverb', 'interjection', 'preposition'],
    required: true,
  },
});

const savedWordsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  words: [wordSchema],
});

const SavedWords = mongoose.model('SavedWords', savedWordsSchema);

module.exports = SavedWords;
