import { query, body } from "express-validator";

export const booleanSchema = (
  location = "query",
  field = "boolean",
  options = {
    isOptional: false,
  }
) => {
  let validationChain = { query, body }[location](field);

  if (options.isOptional) {
    validationChain = validationChain.optional();
  }

  validationChain = validationChain
    .customSanitizer((value) => {
      if (typeof value === "boolean") return value;
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    })
    .isBoolean()
    .withMessage(`${field} must be a boolean!`);

  return [validationChain];
};
