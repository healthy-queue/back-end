const supertest = require('supertest')
const { app } = require('../server')
const { db, visits, patients } = require('../models/index')
const request = supertest(app)

beforeAll( async () => {
  await db.sync()
  await patients.bulkCreate([
    {
      id: 1,
      first_name: 'sally',
      last_name: 'slappy',
      date_of_birth: '2022-03-09T16:38:19.747Z',
      enqueued: false,
      phone_number: '111-111-1111',
      email_address: 'fake@fake.com',
      insurance_carrier: 'Tricare',
      insurance_group: 'Fancy Tricare',
      createdAt: '2022-03-09T16:38:19.747Z',
      updatedAt: '2022-03-09T16:38:19.747Z'
    },
  ])
  await visits.bulkCreate([
    {
      id: 1,
      patient_id: 1,
      admission_date: '2021-10-08T14:08:13.311Z',
      discharge_date: '2021-10-08T14:08:13.311Z',
      primary_ailment: 'stomach ache',
      room: '2',
      notes: null,
      createdAt: '2022-03-10T05:59:29.899Z',
      updatedAt: '2022-03-10T05:59:29.899Z'
    },
    {
      id: 2,
      patient_id: 1,
      admission_date: '2021-10-08T14:08:13.311Z',
      discharge_date: '2021-10-08T14:08:13.311Z',
      primary_ailment: 'headache',
      room: '1',
      notes: null,
      createdAt: '2022-03-10T05:59:29.899Z',
      updatedAt: '2022-03-10T05:59:29.899Z'
    },
    {
      id: 3,
      patient_id: 2,
      admission_date: '2021-10-08T14:08:13.311Z',
      discharge_date: '2021-10-08T14:08:13.311Z',
      primary_ailment: 'arthritis',
      room: '3',
      notes: 'Patient is stable',
      createdAt: '2022-03-10T05:59:29.899Z',
      updatedAt: '2022-03-10T05:59:29.899Z'
    }
  ]
  )
})
afterAll( async () => await db.drop() )
describe('When given GET on /visits', ()=> {
  it('can serve all visits of all existing patients', async () => {
    const response = await request.get('/visits')
    expect(response.status).toBe(200)
    expect(response.body.allVisits[0]).toEqual(
      {
        id: 1,
        patient_id: 1,
        admission_date: '2021-10-08T14:08:13.311Z',
        discharge_date: '2021-10-08T14:08:13.311Z',
        primary_ailment: 'stomach ache',
        room: '2',
        notes: null,
        createdAt: '2022-03-10T05:59:29.899Z',
        updatedAt: '2022-03-10T05:59:29.899Z'
      },
      {
        id: 2,
        patient_id: 1,
        admission_date: '2021-10-08T14:08:13.311Z',
        discharge_date: '2021-10-08T14:08:13.311Z',
        primary_ailment: 'headache',
        room: '1',
        notes: null,
        createdAt: '2022-03-10T05:59:29.899Z',
        updatedAt: '2022-03-10T05:59:29.899Z'
      },
      {
        id: 3,
        patient_id: 2,
        admission_date: '2021-10-08T14:08:13.311Z',
        discharge_date: '2021-10-08T14:08:13.311Z',
        primary_ailment: 'arthritis',
        room: '3',
        notes: 'Patient is stable',
        createdAt: '2022-03-10T05:59:29.899Z',
        updatedAt: '2022-03-10T05:59:29.899Z'
      }
    )
  })
})
describe('When given GET on /visit/:id', ()=> {
  it('can serve visits whose corresponding patient_id exists', async () => {
    const response = await request.get('/visit/1')
    expect(response.status).toBe(200)
    expect(response.body.targetVisit).toEqual(
      {
        id: 1,
        patient_id: 1,
        admission_date: '2021-10-08T14:08:13.311Z',
        discharge_date: '2021-10-08T14:08:13.311Z',
        primary_ailment: 'stomach ache',
        notes: null,
        room: '2',
        createdAt: '2022-03-10T05:59:29.899Z',
        updatedAt: '2022-03-10T05:59:29.899Z'
      }
    )
  })
})
describe('When POST on /visit', ()=> {
  it('can create and serve new visits if the patient_id === 1 exists', async () => {
    const targetPatient = await request.get('/patient/1')
    expect(targetPatient.status).toBe(200)
    expect(targetPatient.body.id).toBe(1)
    const newVisit = {     
      id: 4,
      patient_id : 1,
      admission_date: '2021-12-28T02:36:05.167Z',
      createdAt: '2022-03-10T18:13:48.816Z',
      updatedAt: '2022-03-10T18:13:48.816Z'
    }
    const response = await request.post('/visit').send({...newVisit})
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(4)
    expect(Object.keys(response.body).length).toBe(5)
  })
})
describe('When PUT on /visit/:id', ()=> {
  it('can update an existing visit', async () => {
    const body = {     
      id: 1,
      patient_id : 1,
      admission_date: '2021-06-03T16:27:08.858Z',
      primary_ailment: 'tummy ache',
      createdAt: '2021-06-03T16:27:08.858Z',
      updatedAt: '2021-06-03T16:27:08.858Z'
    }
    const response = await request.put('/visit/1').send({...body})
    expect(response.status).toBe(200)
    expect(response.body.updatedVisit[0]).toBe(1)
  })
})
//TODO can instead soft delete
describe('When DELETE on /visit/:id', ()=> {
  it('can destroy an existing visit with existing id', async () => {
    const response = await request.delete('/visit/3')
    expect(response.status).toBe(200)
    expect(response.body.numDeleted).toBe(1)
  })
})
