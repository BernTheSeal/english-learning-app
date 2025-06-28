import BaseError from "../../errors/baseError.js";

class RolePermissionError extends BaseError {
  constructor(message, statusCode = 401, errors = null) {
    super(message, "rolePermission_error", statusCode, errors);
  }
}

export default RolePermissionError;
