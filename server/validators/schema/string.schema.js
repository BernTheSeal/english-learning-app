import { body, query, param } from "express-validator";

export const stringSchema = (
  location = "body",
  field = "string",
  options = {
    isOptional: false,
    minLength: 1,
    maxLength: 255,
    requiredChar: null,
    isStrict: true,
  }
) => {
  let validationChain = { body, query, params: param }[location](field);

  const regex = options.isStrict ? /^[a-zA-Z0-9._-]+$/ : /^[a-zA-Z0-9.,!?()'"_;:\- ]+$/;

  if (options.isOptional) {
    validationChain = validationChain.optional();
  }

  validationChain = validationChain
    .trim()
    .notEmpty()
    .withMessage(`${field} is required!`)
    .bail()
    .custom((value) => {
      if (!isNaN(value)) {
        throw new Error(`${field} must be a string!`);
      }
      return true;
    })
    .bail()
    .isLength({ min: options.minLength, max: options.maxLength })
    .withMessage(
      `${field} must be between ${options.minLength}-${options.maxLength} characters!`
    )
    .bail()
    .matches(regex)
    .withMessage(`${field} contains invalid characters!`)
    .bail();

  if (options.requiredChar) {
    validationChain = validationChain
      .contains(options.requiredChar)
      .withMessage(`${field} must contain the character "${options.requiredChar}"!`)
      .bail();
  }

  validationChain.escape();

  return [validationChain];
};
