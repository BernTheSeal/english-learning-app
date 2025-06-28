import BaseError from "../../errors/baseError.js";

export class PermissionError extends BaseError {
  constructor(message, statusCode = 403, errors = null) {
    super(message, "permission_error", statusCode, errors);
  }
}
