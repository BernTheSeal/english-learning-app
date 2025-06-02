import { booleanSchema } from "../schema/boolean.schema.js";
import { idSchema } from "../schema/id.schema.js";
import { stringSchema } from "../schema/string.schema.js";

export const getRoleValidator = [
  booleanSchema("query", "isActive", { isOptional: true }),
  booleanSchema("query", "isDeleteable", { isOptional: true }),
];

export const getRoleByIdValidator = [idSchema("roleId")];

export const addRoleValidator = [
  stringSchema("body", "name", { minLength: 3, maxLength: 15 }),
  stringSchema("body", "description", { minLength: 5, maxLength: 150 }),
  booleanSchema("body", "isDeleteable"),
  booleanSchema("body", "isActive"),
];

export const deleteRoleValidator = [idSchema("roleId")];

export const updateRoleValidator = [
  idSchema("roleId"),
  stringSchema("body", "name", { minLength: 3, maxLength: 15, isOptional: true }),
  stringSchema("body", "description", {
    minLength: 5,
    maxLength: 50,
    isOptional: true,
  }),
  booleanSchema("body", "isDeleteable", { isOptional: true }),
  booleanSchema("body", "isActive", { isOptional: true }),
];

export const addPermissionToRoleValidator = [
  idSchema("roleId"),
  idSchema("permissionId"),
];

export const removePermissionFromRoleValidator = [
  idSchema("roleId"),
  idSchema("permissinId"),
];
