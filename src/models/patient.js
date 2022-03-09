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
        validate: {
          is: [/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}/]
        }
      }
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: [/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}/]
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

  return patient
}

module.exports = patientModel;
