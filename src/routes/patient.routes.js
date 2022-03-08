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
  const { patient, patient_info } = db
  try{
    if(!patient || !patient_info) throw new Error({msg: 'model undefined'})
    const all_patients = await patient.findAll({include: [patient_info]})
    res.status(200).send(all_patients)
  }catch(e){
    res.status(404).send(e)
  }
})
patient_routes.get('/patients/:uuid', async (req,res) => {
  const { patient, patient_info } = db
  try{
    if(!patient || !patient_info) throw new Error({msg: 'model undefined'})
    const { uuid } = req.params
    const target_pat = await patient.findOne({ where:{ id:uuid }, includes:[patient_info] })
    res.status(200).send(target_pat)
  }catch(e){
    res.status(404).send(e)
  }
})
patient_routes.post('/patients', async (req,res) => {
  try{
    const { patient, patient_info } = db
    const { uuid,priority,isQueued,time_entered } = req.body
    if(!patient || !patient_info) throw new Error({ msg: 'model undefined' })
    const newPat = await patient.create({id:uuid, priority,isQueued,time_entered})
    res.status(200).send({ newPat })
  }catch(e){
    res.status(404).send(e)
  }
})
patient_routes.post('/patients-info', async (req,res) => {
  try{
    const { patient_info } = db
    if(!patient_info) throw new Error({ msg: 'model undefined' })
    console.log(req.body)
    const newPatInfo = await patient_info.create(req.body)
    res.status(200).send({newPatInfo})
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
    res.status(200).send({deleted_pat})
  }catch(e){ res.status(404).send(e) }
})

module.exports = patient_routes
