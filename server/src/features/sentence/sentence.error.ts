import BaseError from "../../errors/baseError";
import { ErrorStatusCode } from "../../types/StatusCode";
import { ERROR_CATEGORY } from "../../config/errorCategory";

export class SentenceError<T = null> extends BaseError<T> {
  constructor(message: string, statusCode: ErrorStatusCode, errors?: T) {
    super(message, ERROR_CATEGORY.SENTENCE, statusCode, errors);
  }
}
