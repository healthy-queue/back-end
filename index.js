'use strict'

require('dotenv').config()
const { db_connected } = require('./db/models/index')
const env_PORT = process.env.PORT || 3001
const { start } = require('./src/server')

db_connected() && start(env_PORT)
