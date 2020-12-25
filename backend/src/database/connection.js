const Sequelize = require('sequelize');
const dbConfig = require('../config');

const User = require('../models/User');
const Project = require('../models/Project');

const connection = new Sequelize(dbConfig);

User.init(connection);
Project.init(connection);

User.associate(connection.models);
Project.associate(connection.models);

module.exports = connection;