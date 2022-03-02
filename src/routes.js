const express = require('express')
const routes = express.Router()

routes.get('/test', async (req,res) => {
  try{
    const message = 'HOLA, Welcome to Healthy Queue 👋'
    res.status(200).send(message)
  }catch(e){
    console.error('err:',e)
  }
})

module.exports = routes
