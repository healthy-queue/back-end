'use strict'

const visitModel = (sequelize, DataTypes) => {
  const visit = sequelize.define('visit', {
    patient_id : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    admission_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discharge_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    primary_ailment: {
      type: DataTypes.STRING,
      allowedNull: true
    },
    notes: {
      type: DataTypes.TEXT,
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
    timestamps: true,
    tableName: 'visit',
    freezeTableName: true
  })
  return visit
}

module.exports = visitModel
