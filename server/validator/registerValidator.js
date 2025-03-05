const { body, validationResult } = require("express-validator");
const { sendErrorResponse } = require("../utils/responseHelper.js");
const HTTP_STATUS = require("../constants/httpStatus.js");
const User = require("../models/user.js");

const registerValidator = [
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("username must be 5 character at least.")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Username is already in use");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("invalid e-mail")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already in use");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be 8 character at least")
    .custom((value) => {
      if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
        throw new Error(
          "Password must contain at least one uppercase and lowercase letter"
        );
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const simplifiedErrors = errors.array().map((err) => {
        return err.msg;
      });
      return sendErrorResponse(
        res,
        "Validation error",
        HTTP_STATUS.BAD_REQUEST,
        simplifiedErrors
      );
    }
    next();
  },
];

module.exports = registerValidator;
