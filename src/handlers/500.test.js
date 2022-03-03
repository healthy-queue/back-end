'use strict'

const { app } = require('../server')
const supertest = require('supertest')
const mock_req = supertest(app)

describe('Internal Server Error Handling', () => {
  xit('should return 500 when db query fails', async () => {
    const response = await mock_req.get('/bad')
    expect(response.status).toBe(500)
  })
})
