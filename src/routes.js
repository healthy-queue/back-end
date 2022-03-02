const express = require('express')
const routes = express.Router()

routes.get('/test', test);

async function test(req,res){
  try{
    
    const message = `HOLA, Welcome to Healthy Queue 👋`;
    res.status(200).send(message);

  }catch(e){
    console.error('err:',e)
  }
}

module.exports = routes
