const express = require('express')
const { db } = require('../../db/models/index')
const patient_routes = express.Router()

patient_routes.get('/welcome', async (req,res) => {
  try{
    const message = 'HOLA, Welcome to Healthy Queue 👋'
    res.status(200).send(message)
  }catch(e){
    console.error('err:',e)
  }
})
patient_routes.get('/patients', async (req,res) => {
  const { patient } = db
  try{
    if(!patient) throw new Error({msg: 'model undefined'})
    const all_patients = await patient.findAll({})
    res.status(200).send(all_patients)
  }catch(e){
    res.status(404).send(e)
  }
})
patient_routes.get('/patients/:uuid', async (req,res) => {
  const { patient } = db
  try{
    if(!patient) throw new Error({msg: 'model undefined'})
    const { uuid } = req.params
    const target_pat = await patient.findOne({ where:{ id:uuid } })
    res.status(200).send(target_pat)
  }catch(e){
    res.status(404).send(e)
  }
})
patient_routes.post('/patients', async (req,res) => {
  try{
    const { patient } = db
    if(!patient) throw new Error({ msg: 'model undefined' })
    const new_pat = await patient.create(req.body)
    res.status(200).send(new_pat)
  }catch(e){
    res.status(404).send(e)
  }
})
patient_routes.put('/patients/:uuid', async (req,res) => {
  try{
    const { patient } = db
    if(!patient) throw new Error({ msg: 'model undefined' })
    const { uuid } = req.params
    const new_pat = await patient.update(req.body,{ where:{ id:uuid }})
    res.status(200).send(new_pat)
  }catch(e){
    res.status(404).send(e)
  }
})
patient_routes.delete('/patients/:uuid', async (req,res) => {
  try{
    const { patient } = db
    if(!patient) throw new Error({ msg: 'model undefined' })
    const { uuid } = req.params
    const deleted_pat = await patient.destroy({ where:{ id:uuid }})
    console.log('@@',deleted_pat)
    res.status(200).send({deleted_pat})
  }catch(e){ res.status(404).send(e) }
})

module.exports = patient_routes
