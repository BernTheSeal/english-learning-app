import HTTP_STATUS from "../../../config/httpStatus.js";

import accountService from "./account.service.js";
import userRoleService from "../../userRole/userRole.service.js";
import roleService from "../../role/role.service.js";
import sessionService from "../../session/session.service.js";

import { sendSuccessResponse } from "../../../utils/responseHelper.js";
import { clearAccessTokenFromCookie } from "../../../shared/cookie/index.js";

export const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const role = await roleService.getRoleByName("user");

    const user = await accountService.createUser({ email, password, username });

    await userRoleService.addRoleToUser({ userId: user._id, roleId: role._id });

    return sendSuccessResponse(res, "User successfully created", HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = req.user;
  const fullAccess = req.fullAccess;

  try {
    await accountService.deleteUser({ userId, user, fullAccess });

    await sessionService.deleteSession({ userId });

    if (!fullAccess) {
      clearAccessTokenFromCookie(res);
    }

    return sendSuccessResponse(
      res,
      "user successfullly has been deleted.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
