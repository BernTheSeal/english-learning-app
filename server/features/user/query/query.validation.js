import { idSchema } from "../../../validators/schema/id.schema.js";
import { booleanSchema } from "../../../validators/schema/boolean.schema.js";
import { stringSchema } from "../../../validators/schema/string.schema.js";

const get = [
  booleanSchema("query", "isVerified", { isOptional: true }),
  stringSchema("query", "role", { isOptional: true }),
];

const getById = [idSchema("userId")];

export default { get, getById };
