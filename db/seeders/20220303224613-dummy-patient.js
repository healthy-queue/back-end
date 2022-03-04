'use strict'
/* eslint-disable no-unused-vars */
const { uuid } = require('uuidv4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('patients', [
      {
        id: uuid(),
        priority: 1,
        time_entered: Math.floor(Math.random()*100).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: 2,
        time_entered: Math.floor(Math.random()*1000).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: 3,
        time_entered: Math.floor(Math.random()*10000).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }], 
    {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('patients', null, {})
  }
}
