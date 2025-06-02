import BaseError from "./baseError.js";

class ValidationError extends BaseError {
  constructor(message, statusCode = 400, errors = null) {
    super(message, "validation_error", statusCode, errors);
  }
}

export default ValidationError;
