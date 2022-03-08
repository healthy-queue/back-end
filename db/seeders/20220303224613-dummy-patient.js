'use strict'
/* eslint-disable no-unused-vars */
// db/seeders/20220303224613-dummy-patient.js
const { uuid } = require('uuidv4')
const rando = ( min,max ) => Math.floor( Math.random() * ( max - min ) + min )

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('patient', [
      {
        id: uuid(),
        priority: rando(1,4),
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: rando(1,4),
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: rando(1,4),
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        priority: rando(1,4),
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '47a55825-e1ab-44d2-9791-ab0e82014f28',
        priority: rando(1,4),
        isQueued: true,
        time_entered: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      }], 
    {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('patient', null, {})
  }
}
