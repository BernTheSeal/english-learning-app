import { ToogleWordFrequencyHandler } from "./word.handler";
import { sendSuccessResponse } from "../../shared/response";
import wordService from "./word.service";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";

export const toggleWordFrequency: ToogleWordFrequencyHandler = async (req, res, next) => {
  const { wordId } = req.validatedParams;
  const { point } = req.validatedBody;
  const userId = req.userId!;

  try {
    await wordService.toggleWordFrequency({ userId, wordId, point });

    sendSuccessResponse(
      res,
      "Your rating for this word has been updated.",
      HTTP_SUCCESS_STATUS.OK
    );

    return;
  } catch (error) {
    next(error);
  }
};
