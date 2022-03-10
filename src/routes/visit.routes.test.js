const supertest = require('supertest')
const { app } = require('../server')
const { faker } = require('@faker-js/faker')
const { db, visits } = require('../models/index')
const request = supertest(app)
const date1 = faker.date.past()
const date2 = faker.date.past()

beforeAll( async () => {
  await db.sync()
  await visits.bulkCreate([
    {
      id: 1,
      patient_id : 1,
      admission_date: date1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 2,
      patient_id : 1,
      admission_date: date2,
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 3,
      patient_id : 2,
      admission_date: date2,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  ]
  )
})
afterAll( async () => await db.drop() )

describe('When given GET on /visits', ()=> {
  it('can serve all visits of all existing patients', async () => {
    const response = await request.get('/visits')
    expect(response.status).toBe(200)
    expect(response.body[0].id).toBe(1)
    expect(response.body[2].id).toBe(3)
    expect(response.body[0].patient_id).toBe(1)
    expect(response.body[2].patient_id).toBe(2)
    expect(Object.keys(response.body).length).toBe(3)
    expect(Object.keys(response.body[0]).length).toBe(8)
  })
})

describe('When given GET on /visit/:id', ()=> {
  it('can serve visits whose corresponding patient_id exists', async () => {
    const response = await request.get('/visits/1')
    expect(response.status).toBe(200)
    expect(response.body[0].id).toBe(1)
    expect(response.body[1].id).toBe(2)
    expect(response.body[0].patient_id).toBe(1)
    expect(response.body[1].patient_id).toBe(1)
    expect(Object.keys(response.body).length).toBe(2)
    expect(Object.keys(response.body[0]).length).toBe(8)
  })
})

describe('When POST on /visit', ()=> {
  it('can create and serve new visits', async () => {
    const body = {     
      id: 4,
      patient_id : 2,
      admission_date: faker.date.past(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const response = await request.post('/visit').send({...body})
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(4)
    expect(Object.keys(response.body).length).toBe(5)
  })
})

describe('When PUT on /visit/:id', ()=> {

  it('can update an existing visit', async () => {
    const pastDate = faker.date.past()
    const body = {     
      id: 4,
      patient_id : 2,
      admission_date: pastDate,
      primary_aliment: 'tummy ache',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const response = await request.put('/visit/4').send({...body})
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
