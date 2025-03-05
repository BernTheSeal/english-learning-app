const express = require("express");
const { register, login } = require("../controllers/userController.js");
const registerValidator = require("../validator/registerValidator.js");
const { rateLimiter } = require("../middlewares/rateLimiter.js");
const routes = express.Router();

routes.post("/register", rateLimiter, registerValidator, register);
routes.post("/login", rateLimiter, login);

module.exports = routes;
