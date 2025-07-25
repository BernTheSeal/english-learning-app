import { HTTP_ERROR_STATUS } from "../config/httpStatus";
import { ERROR_CATEGORY } from "../config/errorCategory";
import { sendErrorResponse } from "../shared/response";
import { ErrorRequestHandler } from "express";

import BaseError from "../errors/baseError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    console.error(err);
    sendErrorResponse(res, err.message, err.statusCode, err.errorCategory, err.errors);
    return;
  }

  console.log(err);
  sendErrorResponse(
    res,
    "An unexpected error occurred.",
    HTTP_ERROR_STATUS.INTERNAL_SERVER_ERROR,
    ERROR_CATEGORY.APPLICATION
  );
  return;
};

export default globalErrorHandler;
