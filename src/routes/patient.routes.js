const express = require('express')
const patientRoutes = express.Router()
const { patients } = require('../models/index')

patientRoutes.get('/patients', async (req, res, next) => {
  try{
    const allPatients = await patients.findAll()
    res.status(200).send(allPatients)
  } catch(e) {
    next('Error loading all patients')
  } 
})

patientRoutes.get('/patient/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const targetPatient = await patients.findOne({ where:{ id }})
    res.status(200).send(targetPatient)
  } catch(e) {
    next('Error finding a patient by an id')
  }
})

patientRoutes.post('/patient', async (req, res, next) => {
  try{
    const newPatient = await patients.create(req.body)
    req.io.emit('refetch patients')
    res.status(200).send(newPatient)
    //TODO: emit event to all clients to re-fetch
  } catch(e) {
    next('Error adding a patient to the list of all patients')
  }
})

patientRoutes.put('/patient/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const updatedPatient = await patients.update(req.body, { where:{ id }})
    res.status(200).send(updatedPatient)
  } catch(e) {
    next('Error finding a patient by an id')
  }
})

// TODO: make this a soft delete
patientRoutes.delete('/patient/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const numDeleted = await patients.destroy({ where:{ id }})
    res.status(204).send({ numDeleted })
  } catch(e) {
    next('Error deleting a patient by an ID')
  }
})

module.exports = patientRoutes
