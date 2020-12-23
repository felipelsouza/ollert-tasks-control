const express = require('express');

const userController = require('./controllers/UsersController');
const authController = require('./controllers/AuthController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/auth/register', authController.register);
routes.post('/auth/login', authController.login);

routes.post('/auth/logout', authMiddleware, authController.logout);

routes.get('/user', authMiddleware, userController.index);

module.exports = routes;