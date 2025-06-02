import { body, query } from "express-validator";

export const numericSchema = (
  location = "body",
  field = "numeric",
  options = {
    minLength: 0,
    maxLength: 10,
  }
) => {
  let validationChain = { body, query }[location](field);
  validationChain = validationChain
    .trim()
    .notEmpty()
    .withMessage(`${field} is required!`)
    .bail()
    .isLength({ min: options.min, max: options.max })
    .withMessage(`${field} must be ${options.min} digits!`)
    .bail()
    .isNumeric()
    .withMessage(`${field} must contain only numbers!`);

  return [validationChain];
};
