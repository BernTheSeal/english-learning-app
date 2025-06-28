import { booleanSchema } from "../../validators/schema/boolean.schema.js";
import { idSchema } from "../../validators/schema/id.schema.js";
import { stringSchema } from "../../validators/schema/string.schema.js";

const get = [
  booleanSchema("query", "isActive", { isOptional: true }),
  booleanSchema("query", "isDeleteable", { isOptional: true }),
];

const getById = [idSchema("permissionId")];

const create = [
  stringSchema("body", "name", { minLength: 3, maxLength: 25, requiredChar: ":" }),
  stringSchema("body", "description", { minLength: 5, maxLength: 150 }),
  booleanSchema("body", "isDeleteable"),
  booleanSchema("body", "isActive"),
];

const deleteById = [idSchema("permissionId")];

const updateById = [
  idSchema("permissionId"),
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

export default {
  get,
  getById,
  create,
  deleteById,
  updateById,
};
