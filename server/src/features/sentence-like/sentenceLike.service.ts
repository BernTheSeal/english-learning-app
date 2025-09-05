import sentenceLikeRepository from "./sentenceLike.repository";
import sentenceRepository from "../sentence/sentence.repository";

import { toggleLikeInput } from "./sentenceLike.input";

const toggleLike = async ({ userId, sentenceId, category }: toggleLikeInput) => {
  const likedSentences = await sentenceLikeRepository.getByUserIdAndSentenceId({
    userId,
    sentenceId,
  });

  if (!likedSentences) {
    await sentenceLikeRepository.create({ userId, sentenceId, category });
    await sentenceRepository.incrementCount({ sentenceId, category, count: 1 });
  } else {
    if (likedSentences.category === category) {
      await sentenceLikeRepository.deleteByIds({ userId, sentenceId });
      await sentenceRepository.incrementCount({ sentenceId, category, count: 1 });
    } else {
      const prevCategory = likedSentences.category;

      await sentenceLikeRepository.update({ userId, sentenceId, category });
      await sentenceRepository.incrementCount({
        sentenceId,
        category: prevCategory,
        count: -1,
      });
      await sentenceRepository.incrementCount({ sentenceId, category, count: 1 });
    }
  }
};

export default { toggleLike };
