const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('../utils/responseHelper.js');
const HTTP_STATUS = require('../constants/httpStatus.js');

const ensureAuthenticated = async (req, res, next) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return sendErrorResponse(res, 'Token is missing or invalid', HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = decodedAccessToken;
    next();
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(res, 'Token is missing or invalid.', HTTP_STATUS.UNAUTHORIZED);
  }
};

module.exports = ensureAuthenticated;
