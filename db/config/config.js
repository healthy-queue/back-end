/* eslint-disable quotes */
require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
  },
  "test": {
    "username":process.env.DB_TEST_USERNAME,
    "password": process.env.DB_TEST_PASSWORD,
    "database": process.env.DB_TEST_DATABASE,
    "host": process.env.DB_TEST_HOST,
    "dialect": "postgres",
  },
  "production": {
    "use_env_variable": process.env.DATABASE_URL,
    "dialect": "postgres",
  }
}
