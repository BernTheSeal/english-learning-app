import { emailSchema } from "../../../validators/schema/email.schema.js";
import { stringSchema } from "../../../validators/schema/string.schema.js";
import { passwordSchema } from "../../../validators/schema/password.schema.js";

const forgotPassword = [emailSchema()];

const resetPassword = [
  passwordSchema("password", { isStrong: true }),
  stringSchema("params", "token"),
];

const changePassword = [
  passwordSchema("prevPassword"),
  passwordSchema("password", { isStrong: true }),
  passwordSchema("confirmPassword"),
];

export default { forgotPassword, resetPassword, changePassword };
