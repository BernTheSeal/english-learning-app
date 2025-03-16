const express = require('express');
const routes = express.Router();
const ensureAuthencicated = require('../middlewares/ensureAuthenticated.js');
const { getCurrentUser } = require('../controllers/userController.js');

routes.get('/user/getCurrentUser', ensureAuthencicated, getCurrentUser);

module.exports = routes;
