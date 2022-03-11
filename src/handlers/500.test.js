'use strict'

const { app } = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Internal Server Error Handling', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('should return entire error on development', async () => {
    process.env.NODE_ENV = 'development'
    const response = await request.get('/bad')
    expect(response.body.error).toEqual({hidden: "Only visible in development", message: "you've messed up"})
  })

  it('should return only error message on production', async () => {
    process.env.NODE_ENV = 'production'
    const response = await request.get('/bad')
    expect(response.body.error).toEqual("you've messed up")
  })
})
