import { HTTP_SUCCESS_STATUS } from "../../config/httpStatus";
import { sendSuccessResponse } from "../../shared/response/sendSuccessResponse";
import userRoleService from "./userRole.service";
import { UserRoleHandler } from "./userRole.type";

export const addRoleToUser: UserRoleHandler = async (req, res, next) => {
  const { userId, roleId } = req.validatedParams;

  try {
    const { role, user } = await userRoleService.addRoleToUser({ userId, roleId });

    sendSuccessResponse(
      res,
      `'${role.name.toUpperCase()}' role successfully added to '${user.username.toUpperCase()}' `,
      HTTP_SUCCESS_STATUS.OK
    );

    return;
  } catch (error) {
    next(error);
  }
};

export const removeRoleFromUser: UserRoleHandler = async (req, res, next) => {
  const { userId, roleId } = req.validatedParams;
  try {
    const { role, user } = await userRoleService.removeRoleFromUser({ userId, roleId });

    sendSuccessResponse(
      res,
      `The '${role.name.toUpperCase()}' role  has been successfully removed from '${user.username.toUpperCase()}'`,
      HTTP_SUCCESS_STATUS.OK
    );

    return;
  } catch (error) {
    next(error);
  }
};
