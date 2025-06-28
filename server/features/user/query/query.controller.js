import HTTP_STATUS from "../../../config/httpStatus.js";
import { sendSuccessResponse } from "../../../utils/responseHelper.js";

import queryService from "./query.service.js";

export const getMe = async (req, res, next) => {
  const me = req.user;
  try {
    return sendSuccessResponse(res, "It is you!", HTTP_STATUS.OK, {
      me,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  const { isVerified, role } = req.query;

  try {
    const users = await queryService.getUsers({ isVerified, role });

    return sendSuccessResponse(res, "Users filtered successfully", HTTP_STATUS.OK, {
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  const fullAccess = req.fullAccess;

  try {
    const { user, roles } = await queryService.getUserById({ fullAccess, userId });

    return sendSuccessResponse(res, "User fetched successfully by ID.", HTTP_STATUS.OK, {
      user,
      roles: fullAccess ? roles : undefined,
    });
  } catch (error) {
    next(error);
  }
};
