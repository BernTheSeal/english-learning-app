const { body, validationResult } = require('express-validator');
const { sendErrorResponse } = require('../utils/responseHelper.js');
const HTTP_STATUS = require('../constants/httpStatus.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

const loginValidator = [
  body('username')
    .trim()
    .custom(async (username, { req }) => {
      if (!username) {
        return true;
      }
      const user = await User.findOne({ username }).select('+password');
      if (!user) {
        throw new Error('Invalid username or password.');
      }
      req.user = user;
      return true;
    }),

  body('password').custom(async (password, { req }) => {
    if (!password) {
      return true;
    }
    if (!req.user && req.body.username) {
      return true;
    }
    if (!req.user) {
      return;
    }

    const passwordMatch = await bcrypt.compare(password, req.user.password);
    if (!passwordMatch) {
      throw new Error('Invalid username or password.');
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);

    const username = req.body.username;
    const password = req.body.password;

    if (!username && !password) {
      errors.errors = [{ msg: 'Username is required.' }, { msg: 'Password is required.' }];
    } else if (!username) {
      errors.errors = [{ msg: 'Username is required.' }];
    } else if (!password) {
      errors.errors = [{ msg: 'Password is required.' }];
    } else if (username && password && errors.isEmpty()) {
      if (!req.user) {
        errors.errors = [{ msg: 'Invalid username or password.' }];
      }
    }

    if (!errors.isEmpty()) {
      const simplifiedErrors = errors.array().map((err) => {
        return err.msg;
      });
      return sendErrorResponse(res, 'Validation error', HTTP_STATUS.BAD_REQUEST, simplifiedErrors);
    }
    next();
  },
];

module.exports = loginValidator;
