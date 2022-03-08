'use strict'
require('dotenv').config()
const { db_connected } = require('./db/models/index')
const env_PORT = process.env.PORT
const { start } = require('./src/server')
const { uuid } = require('uuidv4')
console.log(uuid())
db_connected() && start(env_PORT || 3001)
