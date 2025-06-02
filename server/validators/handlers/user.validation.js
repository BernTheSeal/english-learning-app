import { idSchema } from "../schema/id.schema.js";
import { booleanSchema } from "../schema/boolean.schema.js";
import { stringSchema } from "../schema/string.schema.js";

export const getUsersValidator = [
  booleanSchema("query", "isVerified", { isOptional: true }),
  stringSchema("query", "role", { isOptional: true }),
];
export const getUserByIdValidator = [idSchema("userId")];

export const deleteUserValidator = [idSchema("userId")];

export const addRoleToUserValidator = [idSchema("userId"), idSchema("roleId")];

export const removeRoleFromUserValidator = [idSchema("userId"), idSchema("roleId")];
