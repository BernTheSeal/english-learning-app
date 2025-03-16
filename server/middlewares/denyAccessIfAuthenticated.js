const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('../utils/responseHelper.js');
const HTTP_STATUS = require('../constants/httpStatus');

const denyAccessIfAuthenticated = (req, res, next) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      return sendErrorResponse(res, 'you are already authenticated.', HTTP_STATUS.FORBIDDEN);
    }
  } catch (error) {
    return next();
  }
};

module.exports = denyAccessIfAuthenticated;
