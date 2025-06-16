import { emailSchema } from "../../../validators/schema/email.schema.js";
import { stringSchema } from "../../../validators/schema/string.schema.js";
import { passwordSchema } from "../../../validators/schema/password.schema.js";

const register = [
  emailSchema(),
  stringSchema("body", "username", { minLength: 3, maxLength: 500 }),
  passwordSchema("password", { isStrong: true }),
];

const login = [emailSchema(), passwordSchema("password")];

export default { register, login };
