const supertest = require('supertest')
const { app } = require('../server')
const request = supertest(app)
const PriorityQueue = require('../queue/priority-queue.singleton')

describe('Given Queue Routes', () => {
  describe('When /queue', ()=> {
    it('Then should return 200 response and queue object', async () => {
      const response = await request.get('/queue')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({red: [], yellow: [], green: []})
    })
  
    it('Then throws 404 on invalid method', async () => {
      const response = await request.post('/queue')
      expect(response.status).toBe(404)
      expect(response.body.message).toBe('404: Not Found')
    })
  })

  describe('When /queue/enqueue', () => {
    afterAll(() => {
      PriorityQueue.dequeueItem()
    })

    it('Then should return 201 response when successful', async () => {
      const response = await request.post('/queue/enqueue').send({patient: {id: 1}, priority: 'red' })
      expect(response.status).toBe(201)
    })

    it('Then should return 500 response when patient.id not provided', async () => {
      const response = await request.post('/queue/enqueue').send({patient: {notId: 1}, priority: 'red' })
      expect(response.status).toBe(500)
    })

    it('Then should return 500 response when priority not provided', async () => {
      const response = await request.post('/queue/enqueue').send({patient: {id: 1} })
      expect(response.status).toBe(500)
    })
  })

  describe('When /queue/dequeue', () => {
    beforeAll(() => {
      PriorityQueue.enqueueItem({id: 1}, 'yellow')
    })

    afterAll(() => {
      PriorityQueue.dequeueItem()
    })

    it('Then should return 200 response and item when successful', async () => {
      const response = await request.post('/queue/dequeue')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({id: 1})
    })

    it('Then should return nothing when queue is empty', async () => {
      // This is strange we should get null instead of an empty object 🤔 
      const response = await request.post('/queue/dequeue')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({})
    })
  })

  describe('When /queue/change-priority', () => {
    beforeAll(() => {
      PriorityQueue.enqueueItem({id: 1}, 'yellow')
    })

    afterAll(() => {
      PriorityQueue.dequeueItem()
    })

    it('Then should return 204 response when successful', async () => {
      const response = await request.post('/queue/change-priority').send({patient: {id: 1}, priority: 'red' })
      expect(response.status).toBe(204)
    })

    it('Then should return x response when no id provided', async () => {
      const response = await request.post('/queue/change-priority').send({patient: {notId: 1}, priority: 'green' })
      expect(response.status).toBe(500)
    })
  })
})
