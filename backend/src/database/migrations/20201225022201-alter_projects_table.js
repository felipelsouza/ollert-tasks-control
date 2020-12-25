'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('projects', 'user_id', {
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('projects', 'user_id', {
      onDelete: 'RESTRICT'
    })
  }
};

