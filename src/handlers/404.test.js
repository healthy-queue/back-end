'use strict'

const { app } = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Not Found', () => {
    expect(response.status).toBe(404)
  it('404 response status served on a invalid route', async () => {
    const response = await request.get('/iDoNotExist')
  })
  it('404 response status served on a invalid HTTP method', async () => {
    const response = await request.patch('/welcome')
    expect(response.status).toEqual(404)
  })

  it('404 response message served on a invalid route', async () => {
    const response = await request.get('/iDoNotExist')
    expect(response.body.message).toEqual('404: Not Found')
  })
})
