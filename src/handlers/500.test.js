'use strict'

const { app } = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Internal Server Error Handling', () => {
  jest.setTimeout(10000)
  it("should return 500 on /bad", async () => {
    const response = await request.get('/bad')
    expect(response.status).toBe(500)
  })
})
