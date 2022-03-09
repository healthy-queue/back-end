'use strict'

const { app } = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Not Found', () => {
  it('404 response status on a bad route', async () => {
    const response = await request.get('/foo')
    expect(response.status).toBe(404)
  })
  it('404 response status on a bad HTTP method', async () => {
    const response = await request.patch('/test')
    expect(response.status).toBe(404)
  })
})
