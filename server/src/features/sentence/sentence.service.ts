import sentenceRepository from "./sentence.repository";
import {
  createSentenceInput,
  deleteSenteceInput,
  getASentenceInput,
  getSentencesInput,
} from "./sentence.input";

import { SentenceError } from "./sentence.error";
import { HTTP_ERROR_STATUS } from "../../config/httpStatus";
import userRoleRepository from "../userRole/userRole.repository";
import sentencePolicy from "../../policies/sentence.policy";
import { Types } from "mongoose";

const getSentences = async ({ cursor, parentId }: getSentencesInput) => {
  return await sentenceRepository.getAll({ cursor, parentId });
};

const getASentence = async ({ sentenceId }: getASentenceInput) => {
  return await sentenceRepository.getById(sentenceId);
};

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

const deleteSenteceOrThrow = async ({ sentenceId, userId }: deleteSenteceInput) => {
  const deletedSentece = await sentenceRepository.getById(sentenceId);

  if (!deletedSentece) {
    throw new SentenceError(
      "The sentence you are trying to delete does not exist.",
      HTTP_ERROR_STATUS.NOT_FOUND
    );
  }

  const userRoles = await userRoleRepository.getRolesByUserId(userId);

  const canDelete = sentencePolicy.canDeleteSentece({
    requesterId: userId,
    sentenceOwnerId: deletedSentece.userId as Types.ObjectId,
    roles: userRoles,
  });

  if (!canDelete.allowed) {
    throw new SentenceError(`${canDelete.reason}`, HTTP_ERROR_STATUS.FORBIDDEN);
  }

  await sentenceRepository.deleteById(sentenceId);
  return;
};

export default {
  getSentences,
  createSentenceOrThrow,
  deleteSenteceOrThrow,
  getASentence,
};
