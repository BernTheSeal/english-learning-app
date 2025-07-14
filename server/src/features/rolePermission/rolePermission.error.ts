import BaseError from "../../errors/baseError";
import { ErrorStatusCode } from "../../types/StatusCode";
import { ERROR_CATEGORY } from "../../config/errorCategory";

class RolePermissionError<T = null> extends BaseError<T> {
  constructor(message: string, statusCode: ErrorStatusCode, errors?: T) {
    super(message, ERROR_CATEGORY.ROLE_PERMISSION, statusCode, errors);
  }
}

export default RolePermissionError;
