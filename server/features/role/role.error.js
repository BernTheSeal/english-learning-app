import BaseError from "../../errors/baseError.js";

export class RoleError extends BaseError {
  constructor(message, statusCode, errors = null) {
    super(message, "role_error", statusCode, errors);
  }
}
