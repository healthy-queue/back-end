const express = require('express')
const visitRoutes = express.Router()
const { visits, patients } = require('../models/index')

visitRoutes.get('/visits', async (req, res, next) => {
  try{
    const allVisits = await visits.findAll()
    res.status(200).send({ allVisits })
  } catch(e) {
    next(e)
  }
})

visitRoutes.get('/visits/:patientId', async (req, res, next) => {
  try {
    const { patientId } = req.params
    const patientVisits = await visits.findAll({ where: { patient_id: patientId }})
    res.status(200).send({ patientVisits })
  } catch(e) {
    next(e)
  }
})

visitRoutes.get('/visit/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const targetVisit = await visits.findOne({ where:{ id }})
    res.status(200).send({ targetVisit })
  } catch(e) {
    next(e)
  }
})

visitRoutes.post('/visit', async (req, res, next) => {
  try {
    const { patient_id } = req.body
    const targetPatient = await patients.findOne({ where: { id: patient_id }})
    
    if(targetPatient === null) throw new Error('No Patient Found')
    const newVisit = await visits.create(req.body)
    res.status(200).send(newVisit)
  } catch(e) {
    next(e)
  }
})

visitRoutes.put('/visit/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedVisit = await visits.update(req.body, { where: { id }})
    res.status(200).send({ updatedVisit })
  } catch(e) {
    next(e)
  }
})

// TODO: make this a soft delete
visitRoutes.delete('/visit/:id', async (req, res, next) => {
  try{
    const { id } = req.params
    const numDeleted = await visits.destroy({ where:{ id }})
    res.status(200).send({ numDeleted })
  } catch(e) {
    next(e)
  }
})

module.exports = visitRoutes
