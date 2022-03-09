const queue = require('./queue.routes');
const express = require('express');
const queue_routes = express.Router();

// TODO these should be protected routes
queue_routes.post('/queue', async (req, res) => {
  try {
    console.log('Creating Queue')
    const id = req.body.id
    if(!queue[id]) {
      queue[id] = []
    } else {
      throw new Error({msg: 'Queue Already Exists'})
    }
    res.status(200).send(queue[id])
  } catch(e) {
    res.status(500).send(e)
  }
})

queue_routes.get('/queue/:id', async (req, res) => {
  try{
    const { id } = req.params
    if(!queue[id]) throw new Error({msg: 'Queue Not Found'})
    res.status(200).send(queue[id])
  }catch(e){
    res.status(404).send(e)
  }
})

queue_routes.post('/queue/:id', async (req, res) => {
  try {
    const { id } = req.params
    if(!queue[id]) throw new Error({msg: 'Queue Not Found'})
    // We should have some validation to things we push to the queue
    queue[id].push(req.body)
    res.status(200).send(e)
  } catch(e) {
    res.status(500).send(e)
  }
})

module.exports = queue_routes