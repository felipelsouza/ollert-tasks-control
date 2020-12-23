'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('user', 'users')
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('users', 'user')
  }
};
