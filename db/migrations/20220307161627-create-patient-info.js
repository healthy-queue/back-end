'use strict'
/* eslint-disable no-unused-vars */
//db/migrations/20220307161627-create-patient-info.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patient_info', {
      id: {
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dob: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      patient_id: {
        type: Sequelize.UUID,
        references: {
          model: 'patient',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('patient_info')
  }
}
