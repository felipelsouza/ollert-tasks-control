const Sequelize = require('sequelize');
const dbConfig = require('../config');

const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const TaskStatus = require('../models/TaskStatus');

const connection = new Sequelize(dbConfig);

User.init(connection);
Project.init(connection);
Task.init(connection);
TaskStatus.init(connection);

User.associate(connection.models);
Project.associate(connection.models);
Task.associate(connection.models);
TaskStatus.associate(connection.models);

module.exports = connection;