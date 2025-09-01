import { Handler } from "express";
import wordHistoryService from "./wordHistory.service";
import { sendSuccessResponse } from "../../shared/response";
import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";

export const getWordHistory: Handler = async (req, res, next) => {
  try {
    const history = await wordHistoryService.getWordHistory();
    sendSuccessResponse(
      res,
      "Word history is fetched successfully.",
      HTTP_SUCCESS_STATUS.OK,
      { history }
    );
    return;
  } catch (error) {
    next(error);
  }
};

export const getWordHistoryForUser: Handler = async (req, res, next) => {
  const userId = req.userId!;

  try {
    const history = await wordHistoryService.getWordHistory(userId);
    sendSuccessResponse(
      res,
      "Word history is fetched successfully.",
      HTTP_SUCCESS_STATUS.OK,
      { history }
    );
    return;
  } catch (error) {
    next(error);
  }
};
