import dictionaryExternal from "./dictionary.external";
import dictionaryAdapter from "./dictionary.adapter";
import { DictionaryError } from "./dictionary.error";
import { HTTP_ERROR_STATUS } from "../../config/httpStatus";

const getWordOrThrow = async (word: string) => {
  const rawWord = await dictionaryExternal.fetchWord(word);

  const wordInfo = dictionaryAdapter.normalizeWord(rawWord);

  if (!wordInfo) {
    throw new DictionaryError(
      "The word data could not be processed. Please try again later.",
      HTTP_ERROR_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  return wordInfo;
};

export default { getWordOrThrow };
