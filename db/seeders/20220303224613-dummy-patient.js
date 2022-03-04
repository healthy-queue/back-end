'use strict'
/* eslint-disable no-unused-vars */
const { uuid } = require('uuidv4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('patients', [
      {
        id: uuid(),
        priority: 1,
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: 2,
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: 1,
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: 2,
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: 3,
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      }], 
    {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('patients', null, {})
  }
}
