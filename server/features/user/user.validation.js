import { idSchema } from "../../validators/schema/id.schema.js";
import { booleanSchema } from "../../validators/schema/boolean.schema.js";
import { stringSchema } from "../../validators/schema/string.schema.js";

const getUsers = [
  booleanSchema("query", "isVerified", { isOptional: true }),
  stringSchema("query", "role", { isOptional: true }),
];

const getUserById = [idSchema("userId")];

const deleteUser = [idSchema("userId")];

export default { getUsers, getUserById, deleteUser };
