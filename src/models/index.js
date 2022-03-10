'use strict'

require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
const patientModel = require('./patient')
const visitModel = require('./visit')

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory' 
  : process.env.DATABASE_URL

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' 
  ? {
    dialectOptions: {
      logging: false,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG)

module.exports = {
  db: sequelize,
  patients: patientModel(sequelize, DataTypes),
  visits: visitModel(sequelize, DataTypes)
}
