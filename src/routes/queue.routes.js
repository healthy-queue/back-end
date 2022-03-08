const express = require('express')
const queue_routes = express.Router()
const Redis = require('ioredis')

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

REDIS_URL = process.env.NODE_ENV === 'production'
  ? process.env.REDIS_URL
  : 'redis://127.0.0.1:6379'

const redisOptions = process.env.NODE_ENV === 'production'
  ? {
    tls: {
      rejectUnauthorized: false,    
      requestCert: true,
      agent: false
    },
  }
  :{}

const redis = new Redis(REDIS_URL,redisOptions)

redis.on('error', (e)=> console.log('err',e))

const queue = (client) => {
  return{

    push: async (key,val) => await client.rpush(key,val),
    pop: async (key) => await client.lpop(key),
    range: async (key) => await client.lrange(key,0,-1)
  }
}
 
queue_routes.get('/queue/all', async (req,res)=>{
  const { range } = queue(redis)
  try{
    const all_res = await Promise.all([range('red'),range('yellow'),range('green')]).then(res => res).catch(e => e)
    res.status(200).send({all_res})
  }catch(e){
    res.status(500).send({ err:e })
  }
})
queue_routes.get('/queue/which', async (req,res)=>{
  const { priority } = req.query
  const { range } = queue(redis)
  try{
    const range_res = await Promise.resolve(range(priority)).then(res => res)
    res.status(200).send({range_res})
  }catch(e){
    const range_rej = await Promise.resolve(range(priority)).then(res => res)
    res.status(500).send({err:e,range_rej})
  }
})
queue_routes.post('/queue/push', async (req,res)=>{
  const { q_name,patient } = req.body
  const { push } = queue(redis)
  try{
    const push_res = await Promise.resolve(push(q_name,patient)).then(res => res)
    res.status(202).send({push_res})
  }catch(e){
    const push_rej = await Promise.reject(push(q_name,patient)).then(res => res)
    res.status(500).send({err:e,push_rej})
  }
})
queue_routes.post('/queue/pop', async (req,res)=>{
  const { pop } = queue(redis)
  const { q_name } = req.body
  try{
    const pop_res = await Promise.resolve(pop(q_name)).then(res => res)
    res.status(202).send({pop_res})
  }catch(e){
    const pop_rej = await Promise.reject(pop(q_name)).then(res => res)
    res.status(500).send({err:e,pop_rej})
  }
})

module.exports = queue_routes
