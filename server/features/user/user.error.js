import BaseError from "../../errors/baseError.js";

class UserError extends BaseError {
  constructor(message, statusCode, errors = null) {
    super(message, "user_error", statusCode, errors);
  }
}

export default UserError;
