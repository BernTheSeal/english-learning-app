import { Handler } from "express";
import { HTTP_SUCCESS_STATUS } from "../../../config/httpStatus";
import { sendSuccessResponse } from "../../../shared/response/sendSuccessResponse";
import queryService from "./query.service";
import { GetUserByIdHandler, GetUsersHandler } from "./query.handler";

export const getMe: Handler = async (req, res, next) => {
  const userId = req.userId!;
  try {
    const me = await queryService.getMe(userId);
    return sendSuccessResponse(res, "It is you!", HTTP_SUCCESS_STATUS.OK, {
      me,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers: GetUsersHandler = async (req, res, next) => {
  const { isVerified, role } = req.validatedQuery;
  try {
    const users = await queryService.getUsers({ isVerified, role });
    return sendSuccessResponse(res, "Users filtered successfully", HTTP_SUCCESS_STATUS.OK, {
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById: GetUserByIdHandler = async (req, res, next) => {
  const { userId } = req.validatedParams;
  const userIdFromToken = req.userId!;
  try {
    const data = await queryService.getUserById(userId, userIdFromToken);

    return sendSuccessResponse(res, "User fetched successfully by ID.", HTTP_SUCCESS_STATUS.OK, {
      ...data,
    });
  } catch (error) {
    next(error);
  }
};
