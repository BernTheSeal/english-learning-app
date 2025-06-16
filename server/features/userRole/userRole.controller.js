import HTTP_STATUS from "../../config/httpStatus.js";
import { sendSuccessResponse } from "../../utils/responseHelper.js";
import userRoleService from "./userRole.service.js";

export const addRoleToUser = async (req, res, next) => {
  const { userId, roleId } = req.params;

  try {
    const { role, user } = await userRoleService.addRoleToUser({ userId, roleId });

    return sendSuccessResponse(
      res,
      `'${role.name.toUpperCase()}' role successfully added to '${user.username.toUpperCase()}' `,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const removeRoleFromUser = async (req, res, next) => {
  const { userId, roleId } = req.params;
  try {
    const { role, user } = await userRoleService.removeRoleFromUser({ userId, roleId });

    return sendSuccessResponse(
      res,
      `The '${role.name.toUpperCase()}' role  has been successfully removed from '${user.username.toUpperCase()}'`,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
