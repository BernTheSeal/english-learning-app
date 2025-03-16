const express = require('express');
const { register, login, logout, refresh } = require('../controllers/authController.js');
const registerValidator = require('../validator/registerValidator.js');
const loginValidator = require('../validator/loginValidator.js');
const { rateLimiter } = require('../middlewares/rateLimiter.js');
const denyAccessIfAuthenticated = require('../middlewares/denyAccessIfAuthenticated.js');
const routes = express.Router();

routes.post('/auth/register', rateLimiter, denyAccessIfAuthenticated, registerValidator, register);
routes.post('/auth/login', rateLimiter, denyAccessIfAuthenticated, loginValidator, login);
routes.get('/auth/refresh', refresh);
routes.get('/auth/logout', logout);

module.exports = routes;
