import { booleanSchema } from "../schema/boolean.schema.js";
import { idSchema } from "../schema/id.schema.js";
import { stringSchema } from "../schema/string.schema.js";

export const getPermissionsValidator = [
  booleanSchema("query", "isActive", { isOptional: true }),
  booleanSchema("query", "isDeleteable", { isOptional: true }),
];

export const getPermissionByIdValidator = [idSchema("permissionId")];

export const addPermissionValidator = [
  stringSchema("body", "name", { minLength: 3, maxLength: 25, requiredChar: ":" }),
  stringSchema("body", "description", { minLength: 5, maxLength: 150 }),
  booleanSchema("body", "isDeleteable"),
  booleanSchema("body", "isActive"),
];

export const deletePermissionValidator = [idSchema("permissionId")];

export const updatePermissionValidator = [
  stringSchema("body", "name", {
    minLength: 3,
    maxLength: 15,
    isOptional: true,
    requiredChar: ":",
  }),
  stringSchema("body", "description", {
    minLength: 5,
    maxLength: 50,
    isOptional: true,
  }),
  booleanSchema("body", "isDeleteable", { isOptional: true }),
  booleanSchema("body", "isActive", { isOptional: true }),
];
