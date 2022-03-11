
const PriorityQueue = require('./priority-queue.singleton')

describe('Given a Priority Queue', () => {
  describe('When Empty', () => {
    it('Then should be able to print empty queue', () => {
      expect(PriorityQueue.print()).toStrictEqual()
    })

    it.todo('Then should be able to print populated queue')
  })
})