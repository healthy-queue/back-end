'use strict'

const patientModel = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    first_name: {
      type: DataTypes.STRING,
      default: 'John',
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      default: 'Doe',
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: [/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/]
      }
    },
    enqueued: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: [/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/]
      }
    },
    insurance_carrier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insurance_group: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },{
    timestamps:true,
    tableName: 'patient',
    freezeTableName:true
  })

  patient.beforeCreate(user => {
    user.enqueued = false
  })

  return patient
}

module.exports = patientModel
