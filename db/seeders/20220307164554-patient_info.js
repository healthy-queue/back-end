'use strict'
/* eslint-disable no-unused-vars */
//db/seeders/20220307164554-patient_info.js
const { uuid } = require('uuidv4')
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('patient_info', [
      {
        id: uuid(),
        patient_id: '47a55825-e1ab-44d2-9791-ab0e82014f28',
        name: faker.name.findName(),
        dob:faker.date.past().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('patient_info', null, {})
  }
}
