import { validationResult } from "express-validator";
import ValidationError from "../errors/validationError.js";
import HTTP_STATUS from "../config/httpStatus.js";

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      value: err.value,
      field: err.path,
      message: err.msg,
    }));

    next(
      new ValidationError(
        "Some fields are invalid. Please check the provided data and try again. ",
        HTTP_STATUS.BAD_REQUEST,
        extractedErrors
      )
    );
    return;
  }

  next();
};
