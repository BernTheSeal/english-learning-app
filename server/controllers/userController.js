const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHelper.js');
const HTTP_STATUS = require('../constants/httpStatus.js');
const User = require('../models/user.js');

const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return sendErrorResponse(res, 'token is not found', HTTP_STATUS.UNAUTHORIZED);
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return sendErrorResponse(res, 'user is not found', HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccessResponse(res, 'user is found', HTTP_STATUS.OK, user);
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

module.exports = { getCurrentUser };
