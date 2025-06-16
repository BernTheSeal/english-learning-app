import HTTP_STATUS from "../../config/httpStatus.js";
import { sendSuccessResponse } from "../../utils/responseHelper.js";
import userService from "./user.service.js";

export const getUsers = async (req, res, next) => {
  const { isVerified, role } = req.query;

  try {
    const users = await userService.getUsers({ isVerified, role });

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
    const { user, roles } = await userService.getUserById({ fullAccess, userId });

    return sendSuccessResponse(res, "User fetched successfully by ID.", HTTP_STATUS.OK, {
      user,
      roles: fullAccess ? roles : undefined,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = req.user;
  const fullAccess = req.fullAccess;

  try {
    await userService.deleteUser({ userId, user, fullAccess });

    return sendSuccessResponse(
      res,
      "user successfullly has been deleted.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
