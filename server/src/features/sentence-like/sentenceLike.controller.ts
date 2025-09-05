import sentenceLikeService from "./sentenceLike.service";
import { ToggleSentenceLikeHandler } from "./sentenceLike.handler";
import { sendSuccessResponse } from "../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";

export const toggleSentenceLike: ToggleSentenceLikeHandler = async (req, res, next) => {
  const { sentenceId } = req.validatedParams;
  const { category } = req.validatedBody;
  const userId = req.userId!;

  try {
    await sentenceLikeService.toggleLike({
      userId,
      sentenceId,
      category,
    });
    sendSuccessResponse(
      res,
      "Toggle action completed successfully.",
      HTTP_SUCCESS_STATUS.CREATED
    );
    return;
  } catch (error) {
    next(error);
  }
};
