const express = require('express')
const queue_routes = express.Router()
const PriorityQueue = require('../queue/priority-queue.singleton')

queue_routes.get('/queue', async (req, res, next) => {
  try {
    res.status(200).send(PriorityQueue.print())
  } catch (e) {
    next(e)
  }
})

queue_routes.post('/queue/enqueue', async (req, res, next) => {
  try {
    const { patient, priority } = req.body
    PriorityQueue.enqueueItem(patient, priority)
    // Todo: Dispatch the event to fetch queue here
    res.status(201).send()
  } catch (e) {
    next(e)
  }
})

queue_routes.post('/queue/dequeue', async (req, res, next) => {
  try {
    // Todo: Dispatch the event to fetch queue here
    res.status(200).send(PriorityQueue.dequeueItem())
  } catch (e) {
    next(e)
  }
})

queue_routes.post('/queue/change-priority', async (req, res, next) => {
  try {
    const { id, priority, toTail } = req.body
    res.status(204).send(PriorityQueue.changePriority(id, priority, boolean(toTail)))
  } catch (e) {
    next(e)
  }
})

module.exports = queue_routes
