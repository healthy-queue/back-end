const supertest = require('supertest')
const { app } = require('../server')
const { db, patients } = require('../models/index')
const request = supertest(app)

beforeAll( async () => {
  await db.sync()
  await patients.bulkCreate([
    {
      id: 1,
      first_name: 'Thor',
      last_name: 'Odinson',
      createdAt: new Date('2022-03-10T03:26:05.411Z'),
      updatedAt: new Date('2022-03-10T03:26:05.411Z')
    },
    {
      id: 2,
      first_name: 'Black',
      last_name: 'Widow',
      createdAt: new Date('2022-03-10T03:26:05.411Z'),
      updatedAt: new Date('2022-03-10T03:26:05.411Z')
    }
  ]
  )
})
afterAll( async () => await db.drop() )

describe('When given GET on /patients', ()=> {
  it('can serve all patients', async () => {
    const response = await request.get('/patients')
    const { id } = response.body[0]
    expect(response.status).toBe(200)
    expect(id).toBe(1)
    expect(Object.keys(response.body[0]).length).toBe(10)
    expect(Object.keys(response.body).length).toBe(2)
  })
})
describe('When given GET on /patients/:id', ()=> {
  it('can serve the patient whose corresponding id exists', async () => {
    const response = await request.get('/patient/1')
    const { id } = response.body
    expect(response.status).toBe(200)
    expect(id).toBe(1)
    expect(Object.keys(response.body).length).toBe(10)
  })
})
describe('When POST on /patient', ()=> {
  it('can create and serve a new patient', async () => {
    const body = {     
      id: 3,
      first_name: 'Captain',
      last_name: 'America',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const response = await request.post('/patient').send({...body})
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(3)
    expect(Object.keys(response.body).length).toBe(5)
  })
})
describe('When PUT on /patient/:id', ()=> {

  it('can update and an existing patient', async () => {
    const body = {     
      first_name: 'Updated Captain',
      last_name: 'America',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const response = await request.put('/patient/1').send({...body})
    expect(response.status).toBe(200)
    expect(response.body[0]).toBe(1)
  })

})
describe('When DELETE on /patient/:id', ()=> {
  //TODO can instead soft delete
  it('can destroy an existing patient with existing id', async () => {
    const response = await request.delete('/patient/2')
    expect(response.status).toBe(204)
  })
})
