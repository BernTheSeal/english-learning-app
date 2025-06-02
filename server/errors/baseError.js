class BaseError extends Error {
  constructor(message, type, statusCode = 400, errors = null) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;
