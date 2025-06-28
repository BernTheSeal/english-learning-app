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
    .isLength({ min: options.minLength, max: options.maxLength })
    .withMessage(`${field} must be ${options.minLength} digits!`)
    .bail()
    .isNumeric()
    .withMessage(`${field} must contain only numbers!`);

  return [validationChain];
};
