import { ErrorCategory } from "../types/ErrorCategory";
import { ErrorStatusCode } from "../types/StatusCode";

class BaseError<T> extends Error {
  public statusCode: ErrorStatusCode;
  public errorCategory: ErrorCategory;
  public errors: T | null;

  constructor(message: string, errorCategory: ErrorCategory, statusCode: ErrorStatusCode, errors?: T) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCategory = errorCategory;
    this.errors = errors ?? null;
  }
}

export default BaseError;
