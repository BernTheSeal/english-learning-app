import { booleanSchema } from "../../validators/schema/boolean.schema.js";
import { idSchema } from "../../validators/schema/id.schema.js";
import { stringSchema } from "../../validators/schema/string.schema.js";

const getRole = [
  booleanSchema("query", "isActive", { isOptional: true }),
  booleanSchema("query", "isDeleteable", { isOptional: true }),
];

const getRoleById = [idSchema("roleId")];

const addRole = [
  stringSchema("body", "name", { minLength: 3, maxLength: 15 }),
  stringSchema("body", "description", { minLength: 5, maxLength: 150 }),
  booleanSchema("body", "isDeleteable"),
  booleanSchema("body", "isActive"),
];

const deleteRole = [idSchema("roleId")];

const updateRole = [
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

export default { getRole, getRoleById, addRole, deleteRole, updateRole };
