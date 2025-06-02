import { emailSchema } from "../schema/email.schema.js";
import { stringSchema } from "../schema/string.schema.js";
import { passwordSchema } from "../schema/password.schema.js";
import { numericSchema } from "../schema/numeric.schema.js";

export const registerValidator = [
  emailSchema(),
  stringSchema("body", "username", { minLength: 3, maxLength: 500 }),
  passwordSchema("password", { isStrong: true }),
];

export const loginValidator = [emailSchema(), passwordSchema("password")];

export const verifyCodeValidator = [
  numericSchema("body", "code", { minLength: 6, maxLength: 6 }),
];

export const forgotPasswordValidator = [emailSchema()];

export const resetPasswordValidator = [
  passwordSchema("password", { isStrong: true }),
  stringSchema("params", "token"),
];

export const changePasswordValidator = [
  passwordSchema("prevPassword"),
  passwordSchema("password", { isStrong: true }),
  passwordSchema("passwordConfirm"),
];
