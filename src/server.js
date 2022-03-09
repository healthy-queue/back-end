'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const queue_routes = require('./routes/queue.routes')
const patientRoutes = require('./routes/patient.routes')
const notFoundHandler = require('./handlers/404')
const serverErrorHandler = require('./handlers/500')
const sanityRoutes = require('./routes/sanity.routes')
const visitRoutes = require('./routes/visit.routes')
const corsOptions = {
  origin:process.env.CORS_ORIGIN, 
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(queue_routes)
app.use(patientRoutes)
app.use(visitRoutes)
app.use(sanityRoutes)
app.use(serverErrorHandler)
app.use('*', notFoundHandler)

module.exports = {
  app,
  start: port => {
    if(!port){throw new Error('missing port')}
    app.listen(port, ()=> console.log(`server up at port:${ port }`))
  }
}
