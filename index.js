'use strict'
require('dotenv').config()
const env_PORT = process.env.PORT
const { start } = require('./src/server')

start(env_PORT || 3001)
