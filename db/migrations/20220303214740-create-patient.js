'use strict'
/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      time_entered: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('patients')
  }
}
