const rateLimit = require('express-rate-limit');
const { sendErrorResponse } = require('../utils/responseHelper');

const min = 10;

const rateLimiter = rateLimit({
  windowMs: min * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    sendErrorResponse(res, 'Too many login attempts, please try again later.', 429);
  },
});

module.exports = { rateLimiter };
