import { body } from "express-validator";

export const passwordSchema = (
  field = "password",
  options = {
    isStrong: false,
  }
) => {
  const displayName = field.replace(/([A-Z])/g, " $1").toLowerCase();
  const validationChain = body(field).trim().notEmpty().withMessage(`${displayName} is required!`).bail();
  if (options.isStrong) {
    validationChain
      .isLength({ min: 6 })
      .withMessage(`${displayName} must be at least 6 characters!`)
      .bail()
      .matches(/[A-Z]/)
      .withMessage(`${displayName} must contain at least one uppercase letter!`)
      .matches(/[a-z]/)
      .withMessage(`${displayName} must contain at least one lowercase letter!`)
      .matches(/\d/)
      .withMessage(`${displayName} must contain at least one number!`);
  }
  return [validationChain];
};
