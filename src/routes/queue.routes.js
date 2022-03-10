const express = require('express')
const queue_routes = express.Router()

const healthyQueue = require('../queue/patient-queue')

queue_routes.get('/queue', async (req, res) => {
  res.status(200).send(healthyQueue)
})

queue_routes.post('/queue/enqueue', async (req, res) => {
  let priority = req.body.queue
  let patient = req.body.patient

  healthyQueue[priority].enqueue(patient)

  res.status(200).send(healthyQueue)
})

queue_routes.post('/queue/dequeue', async (req, res) => {

  let queue = req.body.queue
  let dequeuedPatient = healthyQueue[queue].dequeue()

  // here add dequeued patient to an ER board (in database)
  // let acceptedPatient = erBoard.create(dequeuedPatient)

  res.status(200).send(healthyQueue)
})


//==========================================================================

module.exports = queue_routes
