import HTTP_STATUS from "../../../config/httpStatus.js";
import bcrypt from "bcryptjs";
import AuthError from "../../../errors/authError.js";

import { User } from "../../user/user.model.js";
import { Role } from "../../role/role.model.js";
import { UserRole } from "../../userRole/userRole.model.js";

const register = async ({ email, password, username }) => {
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new AuthError(
      "User already exists with this email address.",
      HTTP_STATUS.CONFLICT
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, password: hashedPassword, username });
  await user.save();

  const role = await Role.findOne({ name: "user" });
  if (!role) {
    throw new AuthError("");
  }
  const userRole = new UserRole({
    userId: user._id,
    roleId: role._id,
  });
  await userRole.save();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AuthError(
      "Invalid credentials. Please check your email and password.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthError(
      "Invalid credentials. Please check your email and password.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  user.lastLogin = new Date();
  await user.save();
  return user;
};

export default { register, login };
