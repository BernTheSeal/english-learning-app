import BaseError from "./baseError";
import { ErrorStatusCode } from "../types/StatusCode";
import { ERROR_CATEGORY } from "../config/errorCategory";

class ValidationError<T = null> extends BaseError<T> {
  constructor(message: string, statusCode: ErrorStatusCode, errors?: T) {
    super(message, ERROR_CATEGORY.VALIDATION, statusCode, errors);
  }
}

export default ValidationError;
