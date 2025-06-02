import BaseError from "./baseError.js";

class AuthError extends BaseError {
  constructor(message, statusCode = 401, errors = null) {
    super(message, "auth_error", statusCode, errors);
  }
}

export default AuthError;
