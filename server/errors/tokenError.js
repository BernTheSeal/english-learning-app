import BaseError from "./baseError.js";

class TokenError extends BaseError {
  constructor(message, statusCode = 401, errors = null) {
    super(message, "token_error", statusCode, errors);
  }
}

export default TokenError;
