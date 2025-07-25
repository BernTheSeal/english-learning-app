import dictionaryExternal from "./dictionary.external";
import dictionaryAdapter from "./dictionary.adapter";

const getWordOrThrow = async (word: string) => {
  const rawWord = await dictionaryExternal.fetchWord(word);

  const wordInfo = dictionaryAdapter.normalizeWord(rawWord);

  return wordInfo;
};

export default { getWordOrThrow };
