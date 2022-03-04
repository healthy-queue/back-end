'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const db = {}

let sequelize

if (config.use_env_variable) {

  const { use_env_variable } = config
  let sequelizeOptions = process.env.NODE_ENV === 'production'
    ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
    : {}

  sequelize = new Sequelize(use_env_variable, sequelizeOptions)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

const db_connected = () => sequelize.authenticate()
  .then(() => {
    return console.log(`db connected successfuly \nmode: ${process.env.NODE_ENV}`)
  })
  .catch(err => {
    console.error('Unable to connect to the db:', err)
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = { db, db_connected }
