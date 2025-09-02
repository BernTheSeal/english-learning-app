import sentenceRepository from "../repository/sentence.repository";
import { createSentenceInput } from "../types/sentence.type";
import { SentenceError } from "../sentence.error";
import { HTTP_ERROR_STATUS } from "../../../config/httpStatus";

const createSentenceOrThrow = async ({
  content,
  word,
  wordId,
  parentId,
  userId,
}: createSentenceInput) => {
  const isWordInclude = content.toLowerCase().includes(word.toLowerCase());
  if (!isWordInclude) {
    throw new SentenceError(
      `The sentence must include the selected word: "${word}".`,
      HTTP_ERROR_STATUS.BAD_REQUEST
    );
  }

  if (parentId) {
    const parentSentence = await sentenceRepository.getById(parentId);
    if (!parentSentence) {
      throw new SentenceError(
        "Cannot create an alternative sentence: the parent sentence does not exist.",
        HTTP_ERROR_STATUS.BAD_REQUEST
      );
    }

    if (parentSentence.wordId.toString() !== wordId.toString()) {
      throw new SentenceError(
        "Cannot create an alternative sentence: the parent sentence uses a different word.",
        HTTP_ERROR_STATUS.BAD_REQUEST
      );
    }
  }

  const newSentence = await sentenceRepository.create({
    content,
    wordId,
    parentId: parentId,
    userId,
  });

  return newSentence;
};

export default { createSentenceOrThrow };
