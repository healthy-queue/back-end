const express = require('express')
const sanityRoutes = express.Router()

sanityRoutes.get('/welcome', async (req,res) => {
  try{
    const message = 'HOLA, Welcome to Healthy Queue 👋'
    res.status(200).send(message)
  } catch(e){
    console.error(e.message)
  } finally {
    next()
  }
})

sanityRoutes.get('/bad', (req, res) => {
  next("you've messed up")
})

module.exports = sanityRoutes