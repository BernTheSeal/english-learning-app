export const sendSuccessResponse = (res, message, statusCode, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendErrorResponse = (res, message, statusCode, type, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    type,
    errors,
  });
};
