import { emailSchema } from "../../validators/schema/email.schema.js";
import { passwordSchema } from "../../validators/schema/password.schema.js";

const login = [emailSchema(), passwordSchema("password")];

export default { login };
