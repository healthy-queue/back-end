const supertest = require('supertest')
const { app } = require('../server')
const request = supertest(app)

describe('When given GET on /welcome', ()=> {
  it('can serve a welcome message', async () => {
    const response = await request.get('/welcome')
    expect(response.status).toBe(200)
    expect(response.text).toBe('HOLA, Welcome to Healthy Queue 👋')
  })
  it('can throw an error message', async () => {
    const response = await request.post('/welcome')
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('404: Not Found')
  })
})
describe('When given GET on /bad', ()=> {
  // Todo: test next(error) handler
  it('passes the error to default internal server error handler', async () => {
    const res = await request.get('/bad')
    expect(res.status).toBe(500)
    expect(res.body.error).toBe("you've messed up")
  })
})
