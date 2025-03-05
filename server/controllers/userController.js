const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HTTP_STATUS = require("../constants/httpStatus.js");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHelper.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    return sendSuccessResponse(
      res,
      "succesfully register ",
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    console.error("error::", error.message);
    return sendErrorResponse(
      res,
      "something went wrong",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendErrorResponse(
        res,
        "username and password required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return sendErrorResponse(
        res,
        "username is not found ",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(
        res,
        "password is not correct",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return sendSuccessResponse(res, "login is succesfully ", HTTP_STATUS.OK, {
      token,
    });
  } catch (error) {
    console.error("error::", error.message);
    return sendErrorResponse(
      res,
      "something went wrong",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { register, login };
