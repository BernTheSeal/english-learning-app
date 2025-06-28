import BaseError from "../../errors/baseError.js";

class UserRoleError extends BaseError {
  constructor(message, statusCode, errors = null) {
    super(message, `userRole_error`, statusCode, errors);
  }
}

export default UserRoleError;
