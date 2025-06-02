import { body, query } from "express-validator";

export const emailSchema = (location = "body") => {
  const validationChain = { body, query }[location];
  return [
    validationChain("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .bail()
      .isString()
      .withMessage(" email must be a string!")
      .bail()
      .isEmail()
      .withMessage("Invalid email format!")
      .bail()
      .isLength({ max: 320 })
      .withMessage("Email too long!"),
  ];
};
