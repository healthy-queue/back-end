require('dotenv').config()
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_USERNAME,
    database: 'healthyq',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'username',
    password: 'password',
    database: 'healthyq',
    host: '127.0.0.1',
    dialect: 'sqlite:memory:'
  },
  production: {
    dialect: 'postgres'
  }
}
