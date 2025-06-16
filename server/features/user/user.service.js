import HTTP_STATUS from "../../config/httpStatus.js";

import { UserError } from "../../errors/userError.js";

import { User } from "./user.model.js";
import { UserRole } from "../userRole/userRole.model.js";
import { Role } from "../role/role.model.js";

import { RefreshToken } from "../auth/session/refreshToken.model.js";

const getUsers = async ({ isVerified, role }) => {
  const filter = {};

  if (isVerified) {
    filter.isVerified = isVerified === "true";
  }

  if (role) {
    const roleDoc = await Role.findOne({ name: role });
    if (!roleDoc) {
      throw new UserError("The role does not exist.", HTTP_STATUS.BAD_REQUEST);
    }

    const userRoles = await UserRole.find({ roleId: roleDoc._id }).select("userId");
    const userIds = userRoles.map((userRole) => userRole.userId);

    filter._id = { $in: userIds };
  }

  return await User.find(filter);
};

const getUserById = async ({ userId, fullAccess }) => {
  let user;
  if (fullAccess) {
    user = await User.findById(userId);
  } else {
    user = await User.findById(userId).select("username createdAt lastLogin");
  }

  if (!user) {
    throw new UserError("User not found with the provided ID.", HTTP_STATUS.NOT_FOUND);
  }

  let roles = [];
  if (fullAccess) {
    const userRoles = await UserRole.find({ userId }).populate(
      "roleId",
      "name description"
    );
    roles = userRoles.map((entry) => ({
      name: entry.roleId.name,
      description: entry.roleId.description,
    }));
  }

  return { user, roles };
};

const deleteUser = async ({ user, userId, fullAccess }) => {
  if (!fullAccess) {
    if (!user._id.equals(userId)) {
      throw new UserError(
        "You do not have permission to delete the user.",
        HTTP_STATUS.FORBIDDEN
      );
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  const userToDelete = await User.findById(userId);
  if (!userToDelete) {
    throw new UserError("User not found", HTTP_STATUS.NOT_FOUND);
  }

  const userRoles = (await UserRole.find({ userId }).populate("roleId", "name")).map(
    (r) => r.roleId.name
  );

  if (userRoles.includes("admin")) {
    throw new UserError("Admin cannot be deleted.", HTTP_STATUS.FORBIDDEN);
  }

  await User.deleteOne({ _id: userId });
  await UserRole.deleteMany({ userId });
  await RefreshToken.deleteOne({ userId });
};

export default { getUsers, getUserById, deleteUser };
