import HTTP_STATUS from "../config/httpStatus.js";
import { sendSuccessResponse } from "../utils/responseHelper.js";
import { User } from "../models/user.model.js";
import { UserError } from "../errors/userError.js";
import { UserRole } from "../models/userRole.model.js";
import { Role } from "../models/role.model.js";
import { RefreshToken } from "../models/refreshToken.model.js";

export const getUsers = async (req, res, next) => {
  const { isVerified, role } = req.query;
  const filter = {};

  try {
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

    const users = await User.find(filter);

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

    return sendSuccessResponse(
      res,
      "user successfullly has been deleted.",
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const addRoleToUser = async (req, res, next) => {
  const { userId, roleId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new UserError("User not found.", HTTP_STATUS.NOT_FOUND);
    }

    const role = await Role.findById(roleId);
    if (!role) {
      throw new UserError("Role not found.", HTTP_STATUS.NOT_FOUND);
    }

    if (!role.isActive) {
      throw new UserError(
        `The '${role.name.toUpperCase()}' role is not active.`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const isRoleAssigned = await UserRole.exists({ userId, roleId: role._id });

    if (isRoleAssigned) {
      throw new UserError(
        `'${user.username.toUpperCase()}' already has this '${role.name.toUpperCase()}' role.`
      );
    }

    await UserRole.create({
      userId,
      roleId: role._id,
    });

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
    const user = await User.findById(userId);
    if (!user) {
      throw new UserError("User not found.", HTTP_STATUS.NOT_FOUND);
    }

    const role = await Role.findById(roleId);
    if (!role) {
      throw new UserError("Role not found.", HTTP_STATUS.NOT_FOUND);
    }

    const userHasRole = await UserRole.findOne({ userId, roleId });
    if (!userHasRole) {
      throw new UserError(
        `Cannot remove '${role.name.toUpperCase()}' role from '${user.username.toUpperCase()}' because they do not have it.`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const userRoles = await UserRole.find({ userId });
    if (userRoles.length === 1) {
      const defaultRole = await Role.findOne({ name: "user" }).select("_id");
      if (String(userRoles[0].roleId) === String(defaultRole._id)) {
        throw new UserError(
          "'USER' role cannot be removed as it is the only role",
          HTTP_STATUS.BAD_REQUEST
        );
      }

      await UserRole.create({ userId, roleId: defaultRole._id });
    }

    await UserRole.deleteOne({ userId, roleId });

    return sendSuccessResponse(
      res,
      `The '${role.name.toUpperCase()}' role  has been successfully removed from '${user.username.toUpperCase()}'`,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
