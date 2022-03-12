const express = require('express')
const sanityRoutes = express.Router()

sanityRoutes.get('/welcome', async (req, res, next) => {
  try{
    req.io.emit('new-message', { content: 'HOLA, Welcome to Healthy Queue 👋' })
    const message = 'HOLA, Welcome to Healthy Queue 👋'
    res.status(200).send(message)
  } catch(e){
    res.status(404).send({err: e.message})
  } finally {
    next()
  }
})

sanityRoutes.get('/bad', (req, res, next) => {
  next({ message: "you've messed up", hidden: 'Only visible in development'})
})

module.exports = sanityRoutes
