import { HTTP_SUCCESS_STATUS } from "../../../config/httpStatus";

import accountService from "./account.service";
import userRoleService from "../../userRole/userRole.service";
import roleService from "../../role/role.service";
import sessionService from "../../session/session.service";

import { sendSuccessResponse } from "../../../shared/response/sendSuccessResponse";
import { clearAccessTokenFromCookie } from "../../../shared/cookie/index";

import { RegisterHandler, DeleteUserHandler } from "./account.handler";

export const register: RegisterHandler = async (req, res, next) => {
  const { email, password, username } = req.validatedBody;
  try {
    const role = await roleService.getRoleByName("user");

    const user = await accountService.createUser({ email, password, username });

    await userRoleService.addRoleToUser({ userId: user._id.toString(), roleId: role._id.toString() });

    return sendSuccessResponse(res, "User successfully created", HTTP_SUCCESS_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: DeleteUserHandler = async (req, res, next) => {
  const { userId } = req.validatedParams;
  const userIdFromToken = req.userId!;

  try {
    await accountService.deleteUser({ userId, userIdFromToken });

    await sessionService.deleteSession(userIdFromToken);

    //!clear accessToken from localstore!
    // if (!fullAccess) {
    //   clearAccessTokenFromCookie(res);
    // }

    return sendSuccessResponse(res, "user successfullly has been deleted.", HTTP_SUCCESS_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
