import { WordHistory } from "./wordHistory.model";

const create = async (userId: string, wordId: string) => {
  await WordHistory.create({
    userId,
    wordId,
  });
};

const getWordHistoryByIds = async (userId: string, wordId: string) => {
  return await WordHistory.findOne({ userId, wordId });
};

const getWordHistory = async () => {
  const wordHistory = await WordHistory.find({})
    .populate("userId", "username")
    .populate("wordId", "name")
    .sort({ lastSearch: -1 })
    .limit(100);

  return wordHistory.map((wh) => {
    let username;
    let wordName;
    let wordId;

    if ("username" in wh.userId) {
      username = wh.userId.username;
    }

    if ("name" in wh.wordId && "_id" in wh.wordId) {
      wordName = wh.wordId.name;
      wordId = wh.wordId._id;
    }
    return {
      wordId,
      wordName,
      username,
      lastSearch: wh.lastSearch,
    };
  });
};

const getWordHistoryByUserId = async (userId: string) => {
  const wordHistory = await WordHistory.find({ userId })
    .populate("wordId", "name")
    .sort({ lastSearch: -1 })
    .limit(100);

  return wordHistory.map((wh) => {
    let wordName;
    let wordId;

    if ("name" in wh.wordId && "_id" in wh.wordId) {
      wordName = wh.wordId.name;
      wordId = wh.wordId._id;
    }
    return {
      wordId,
      wordName,
      lastSearch: wh.lastSearch,
    };
  });
};

export default {
  create,
  getWordHistoryByIds,
  getWordHistory,
  getWordHistoryByUserId,
};
