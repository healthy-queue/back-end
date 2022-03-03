'use strict'
require('dotenv').config()
// require('./db/models/index')
const env_PORT = process.env.PORT
const { start } = require('./src/server')

start(env_PORT || 3001)
