import BaseError from "./baseError.js";

export class UserError extends BaseError {
  constructor(message, statusCode, errors = null) {
    super(message, "user_error", statusCode, errors);
  }
}
