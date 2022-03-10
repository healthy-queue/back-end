const Queue = require('./queue')

let populatedQueue, emptyQueue, oneItemQueue

beforeEach(() => {
  populatedQueue = new Queue()
  for (let x of [1,2,3,4,5]) {
    populatedQueue.enqueue(x)
  }

  emptyQueue = new Queue()

  oneItemQueue = new Queue()
  oneItemQueue.enqueue(1)
})

describe('Given a Queue', () => {
  describe('When printing', () => {
    it('Then should be able to print empty queue', () => {
      expect(emptyQueue.print()).toEqual([])
    })

    it('Then should be able to print populated queue', () => {
      expect(populatedQueue.print()).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('When enqueuing', () => {
    it('Then should be able add one item to populated queue', () => {
      populatedQueue.enqueue(6)
      expect(populatedQueue.tail).toEqual({ value: 6, next: null})
      expect(populatedQueue.length).toEqual(6)
    })

    it('Then should be able to add to empty queue', () => {
      emptyQueue.enqueue(1)
      expect(emptyQueue.tail).toEqual({ value: 1, next: null})
      expect(emptyQueue.head).toEqual({ value: 1, next: null})
      expect(emptyQueue.length).toEqual(1)
    })
  })

  describe('When dequeuing', () => {
    it('Then should be to get first value', () => {
      expect(populatedQueue.dequeue()).toEqual(1)
    })

    it('Then should modify head', () => {
      populatedQueue.dequeue()
      expect(populatedQueue.head.value).toEqual(2)
    })

    it('Then should set head and tail to null and length to 0 when only one entry', () => {
      oneItemQueue.dequeue()
      expect(oneItemQueue.head).toEqual(null)
      expect(oneItemQueue.tail).toEqual(null)
      expect(oneItemQueue.length).toEqual(0)
    })
  })

  describe('When adding to front', () => {
    it('Then should add to empty queue', () => {
      emptyQueue.addToFront(1)
      expect(emptyQueue.tail).toEqual({ value: 1, next: null})
      expect(emptyQueue.head).toEqual({ value: 1, next: null})
      expect(emptyQueue.length).toEqual(1)
    })

    it('Then should add modify head and length', () => {
      populatedQueue.addToFront(0)
      expect(populatedQueue.length).toEqual(6)
      expect(populatedQueue.head.value).toEqual(0)
    })
  })

  describe('When removing node by value', () => {
    it('Then should throw error when no value provided', () => {
      expect(() => populatedQueue.removeNode()).toThrow('Value Required')
    })

    it('Then should return null on empty queue', () => {
      expect(emptyQueue.removeNode(1)).toEqual(null)
    })

    it('Then should modify head, tail and length in one item queue', () => {
      oneItemQueue.removeNode(1)
      expect(oneItemQueue.head).toEqual(null)
      expect(oneItemQueue.tail).toEqual(null)
      expect(oneItemQueue.length).toEqual(0)
    })

    it('Then should remove head by value in multi entry queue', () => {
      populatedQueue.removeNode(1)
      expect(populatedQueue.head.value).toEqual(2)
      expect(populatedQueue.tail).toEqual({ value: 5, next: null})
      expect(populatedQueue.length).toEqual(4)
    })

    it('Then should remove tail by value in multi entry queue', () => {
      populatedQueue.removeNode(5)
      expect(populatedQueue.tail).toEqual({ value: 4, next: null})
      expect(populatedQueue.length).toEqual(4)
    })

    it('Then should remove middle node by value in multi entry queue', () => {
      populatedQueue.removeNode(2)
      expect(populatedQueue.head.value).toEqual(1)
      expect(populatedQueue.head.next.value).toEqual(3)
      expect(populatedQueue.head.next.next.value).toEqual(4)
      expect(populatedQueue.tail).toEqual({next: null, value: 5})
      expect(populatedQueue.length).toEqual(4)
    })
  })
})
