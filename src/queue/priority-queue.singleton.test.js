
const PriorityQueue = require('./priority-queue.singleton')

// These tests should run in order since they mutate the singleton class across test specs
describe('Given a Priority Queue', () => {
  describe('When Empty', () => {
    it('Then should be able to print empty queue', () => {
      expect(PriorityQueue.print()).toEqual({ red: [], yellow: [], green: [] })
    })

    it('Then should throw error on dequeueing without providing targetQueue', () => {
      expect(PriorityQueue.dequeueItem()).toEqual(null)
    })

    it('Then should throw error on changePriority when all queues are empty', () => {
      expect(() => PriorityQueue.changePriority(0, 'red')).toThrow('All Queues Empty')
    })

    it('Then should be able to enqueue an item to a specific queue', () => {
      PriorityQueue.enqueueItem({id: 1}, 'red')
      expect(PriorityQueue.print()).toEqual({ red: [{ id: 1 }], yellow: [], green: [] })
    })

    it('Then should be able to enqueue multiple items to a specific queue', () => {
      PriorityQueue.enqueueItem({id: 0}, 'yellow')
      PriorityQueue.enqueueItem({id: 2}, 'yellow')
      PriorityQueue.enqueueItem({id: 3}, 'yellow')
      PriorityQueue.enqueueItem({id: 4}, 'green')
      expect(PriorityQueue.print()).toEqual({ red: [{ id: 1 }], yellow: [{ id: 0}, { id: 2 }, { id: 3 }], green: [{ id: 4 }] })
    })
  })

  describe('When Populated', () => {
    it('Then should be able to move an item to the back of a specific queue', () => {
      PriorityQueue.changePriority(2, 'red')
      expect(PriorityQueue.print()).toEqual({ red: [{ id: 1 }, { id: 2 }], yellow: [{ id: 0}, { id: 3 }], green: [{ id: 4 }] })
    })

    it('Then should be able to move an item to the front of a specific queue', () => {
      PriorityQueue.changePriority(2, 'yellow')
      expect(PriorityQueue.print()).toEqual({ red: [{ id: 1 }], yellow: [{ id: 2}, { id: 0}, { id: 3 }], green: [{ id: 4 }] })
    })

    it('Then should throw error when targetQueue is not valid', () => {
      expect(() => PriorityQueue.changePriority(2, 'iDoNotExist')).toThrow('Not Valid Target Queue')
    })

    it('Then should be able to dequeue an item (red)', () => {
      expect(PriorityQueue.dequeueItem()).toEqual({ id: 1 })
      expect(PriorityQueue.print()).toEqual({ red: [], yellow: [{ id: 2}, { id: 0}, { id: 3 }], green: [{ id: 4 }] })
    })

    it('Then should be able to dequeue an item (yellow)', () => {
      expect(PriorityQueue.dequeueItem()).toEqual({ id: 2 })
      expect(PriorityQueue.dequeueItem()).toEqual({ id: 0 })
      expect(PriorityQueue.dequeueItem()).toEqual({ id: 3 })
      expect(PriorityQueue.print()).toEqual({ red: [], yellow: [], green: [{ id: 4 }] })
    })

    it('Then should be able to dequeue an item (green)', () => {
      expect(PriorityQueue.dequeueItem()).toEqual({ id: 4 })
      expect(PriorityQueue.print()).toEqual({ red: [], yellow: [], green: [] })
    })
  })

  describe('When Running Checks', () => {
    it('Then should throw error when no id provided', () => {
      expect(() => PriorityQueue.checks()).toThrow('No Id Provided')
    })

    it('Then should throw error when no target queue provided', () => {
      expect(() => PriorityQueue.checks(0)).toThrow('No Target Queue Provided')
    })

    it('Then should throw error when invalid target queue provided', () => {
      expect(() => PriorityQueue.checks(0, 'iDoNotExist')).toThrow('Not Valid Target Queue')
    })
  })
})
