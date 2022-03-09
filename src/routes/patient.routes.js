const express = require('express')
const patientRoutes = express.Router()
const { patients } = require('../models/index')

patientRoutes.get('/patients', async (req, res, next) => {
  try{
    const allPatients = await patients.findAll()
    res.status(200).send(allPatients)
  } catch(e) {
    console.error(e.message)
  } finally {
    next()
  }
})

patientRoutes.get('/patient/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const targetPatient = await patients.findOne({ where:{ id }})
    res.status(200).send(targetPatient)
  } catch(e) {
    console.error(e.message)
  } finally {
    next()
  }
})

patientRoutes.post('/patient', async (req, res, next) => {
  try{
    const newPatient = await patients.create(req.body)
    res.status(200).send(newPatient)
  } catch(e) {
    console.error(e.message)
  } finally {
    next()
  }
})

patientRoutes.put('/patient/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const updatedPatient = await patients.update(req.body, { where:{ id }})
    res.status(200).send(updatedPatient)
  } catch(e) {
    console.error(e.message)
  } finally {
    next()
  }
})

// TODO: make this a soft delete
patientRoutes.delete('/patient/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const numDeleted = await patients.destroy({ where:{ id }})
    res.status(204).send({ numDeleted })
  } catch(e) { 
    console.error(e.message)
  } finally {
    next()
  }
})

module.exports = patientRoutes
