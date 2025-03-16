const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../constants/httpStatus.js');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper.js');

const register = async (req, res) => {
  try {
    const { username, email, password, level } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      level,
    });

    const accessToken = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2w',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    await newUser.save();
    return sendSuccessResponse(res, 'Registration successful.', HTTP_STATUS.CREATED, accessToken);
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

const login = async (req, res) => {
  try {
    const user = req.user;

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2w',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return sendSuccessResponse(res, 'Login successful ', HTTP_STATUS.OK, {
      accessToken,
    });
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken');
    sendSuccessResponse(res, 'Logged out and cookie cleared', HTTP_STATUS.OK);
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return sendErrorResponse(res, 'Refresh token is required', HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedRefreshToken.userId);
    if (!user) {
      return sendErrorResponse(res, 'User not found', HTTP_STATUS.NOT_FOUND);
    }

    const newAccessToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '15m',
      },
    );
    return sendSuccessResponse(
      res,
      'A new token has been created',
      HTTP_STATUS.CREATED,
      newAccessToken,
    );
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(
      res,
      'An error occurred. Please try again later.',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

module.exports = { register, login, refresh, logout };
