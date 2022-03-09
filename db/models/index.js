'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const db = {}

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL

let sequelize
console.log('config',config.use_env_variable)

if (config.use_env_variable) {

  const { use_env_variable } = config
  let sequelizeOptions = process.env.NODE_ENV === 'production'
    ? {
      use_env_variable,
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
    : {}
  console.log('use env var',use_env_variable)
  console.log('databaseurl',DATABASE_URL)
  console.log('##',process.env.DATABASE_URL)
  console.log('sequelizeopts',sequelizeOptions)
  sequelize = new Sequelize(DATABASE_URL, sequelizeOptions)
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
