import { emailSchema } from "../../../validators/schema/email.schema.js";
import { stringSchema } from "../../../validators/schema/string.schema.js";
import { passwordSchema } from "../../../validators/schema/password.schema.js";
import { idSchema } from "../../../validators/schema/id.schema.js";

const register = [
  emailSchema(),
  stringSchema("body", "username", { minLength: 3, maxLength: 500 }),
  passwordSchema("password", { isStrong: true }),
];

const deleteById = [idSchema("userId")];

export default { register, deleteById };
