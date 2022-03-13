'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {cors:{origin: '*'}})
const IO_PORT = process.env.IO_PORT || 8000

const queue_routes = require('./routes/queue.routes')
const patientRoutes = require('./routes/patient.routes')
const notFoundHandler = require('./handlers/404')
const serverErrorHandler = require('./handlers/500')
const sanityRoutes = require('./routes/sanity.routes')
const visitRoutes = require('./routes/visit.routes')

app.use((req, res, next) => {
  req.io = io
  return next()
})
app.use(cors())
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
    http.listen(process.env.IO_PORT, () => console.log(`listening on *:${ IO_PORT}`))
  }
}
