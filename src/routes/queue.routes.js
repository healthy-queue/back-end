const express = require('express')
const queue_routes = express.Router()
/* eslint-disable no-undef */
const healthyQueue = require('../queue/queue')


queue_routes.get('/queue', async (req, res) => {
  res.status(200).send([healthyQueue])
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

  console.log(dequeuedPatient)

  // here add dequeued patient to an ER board (in database)
  // let acceptedPatient = erBoard.create(dequeuedPatient)

  res.status(200).send(healthyQueue)
})


// queue_routes.get('/queue/all', async (req,res)=>{
//   const { range } = queue(redis)
//   try{
//     const all_res = await Promise.all([range('red'),range('yellow'),range('green')]).then(res => res).catch(e => e)
//     res.status(200).send({all_res})
//   }catch(e){
//     res.status(500).send({ err:e })
//   }
// })
// queue_routes.get('/queue/which', async (req,res)=>{
//   const { priority } = req.query
//   const { range } = queue(redis)
//   try{
//     const range_res = await Promise.resolve(range(priority)).then(res => res)
//     res.status(200).send({range_res})
//   }catch(e){
//     const range_rej = await Promise.resolve(range(priority)).then(res => res)
//     res.status(500).send({err:e,range_rej})
//   }
// })
// queue_routes.post('/queue/push', async (req,res)=>{
//   const { q_name,patient } = req.body
//   const { push } = queue(redis)
//   try{
//     const push_res = await Promise.resolve(push(q_name,patient)).then(res => res)
//     res.status(202).send({push_res})
//   }catch(e){
//     const push_rej = await Promise.reject(push(q_name,patient)).then(res => res)
//     res.status(500).send({err:e,push_rej})
//   }
// })
// queue_routes.post('/queue/pop', async (req,res)=>{
//   const { pop } = queue(redis)
//   const { q_name } = req.body
//   try{
//     const pop_res = await Promise.resolve(pop(q_name)).then(res => res)
//     res.status(202).send({pop_res})
//   }catch(e){
//     const pop_rej = await Promise.reject(pop(q_name)).then(res => res)
//     res.status(500).send({err:e,pop_rej})
//   }
// })

module.exports = queue_routes
