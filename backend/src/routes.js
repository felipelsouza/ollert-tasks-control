const express = require('express');

const authController = require('./controllers/AuthController');
const userController = require('./controllers/UserController');
const projectController = require('./controllers/ProjectController');
const taskController = require('./controllers/TaskController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

//AUTENTICAÇÃO
routes.post('/auth/register', authController.register);
routes.post('/auth/login', authController.login);

//USUÁRIO
routes.get('/users/:user_id', authMiddleware, userController.index);
routes.put('/users/:user_id', authMiddleware, userController.update);
routes.delete('/users/:user_id', authMiddleware, userController.destroy);

//PROJETOS
routes.post('/users/:user_id/projects', authMiddleware, projectController.store);
routes.get('/users/:user_id/projects', authMiddleware, projectController.indexAll);
routes.get('/users/:user_id/projects/:project_id', authMiddleware, projectController.indexOne);
routes.put('/users/:user_id/projects/:project_id', authMiddleware, projectController.update);
routes.delete('/users/:user_id/projects/:project_id', authMiddleware, projectController.destroy);

//TAREFAS
routes.post('/users/:user_id/projects/:project_id/tasks', authMiddleware, taskController.store);
routes.get('/users/:user_id/projects/:project_id/tasks', authMiddleware, taskController.indexAll);
routes.get('/users/:user_id/projects/:project_id/tasks/:task_id', authMiddleware, taskController.indexOne);
routes.put('/users/:user_id/projects/:project_id/tasks/:task_id', authMiddleware, taskController.update);
routes.delete('/users/:user_id/projects/:project_id/tasks/:task_id', authMiddleware, taskController.destroy);

module.exports = routes;