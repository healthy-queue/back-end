'use strict'

const Queue = require('./queue')

module.exports = {
  queues: {
    'red': new Queue(),
    'yellow': new Queue(),
    'green': new Queue(),
  },
  checks(id, targetQueue) {
    if(id === undefined) throw new Error('No Id Provided')
    if(!targetQueue) throw new Error ('No Target Queue Provided')
    if(!Object.keys(this.queues).includes(targetQueue)) throw new Error('Not Valid Target Queue')
  },
  // Moves an element to the end or beginning of the target queue
  changePriority(id, targetQueue, toTail = true) {
    this.checks(id, targetQueue)
    if(this.queues['red'].length +  this.queues['yellow'].length + this.queues['green'].length === 0) {
      throw new Error('All Queues Empty')
    }
    if(typeof toTail !== 'boolean') throw new Error('toTail should be a boolean')
    for(const i in this.queues) {
      // Remove the item from queue it was previously in
      let result = this.queues[i].removeNode(id) 
      if(result) {
        if(toTail) {
          this.queues[targetQueue].enqueue(result) // Add the item to the end of the queue
        } else {
          this.queues[targetQueue].addToFront(result) // Add the item to the front of the queue
        }
      }
    }
  },
  enqueueItem(value, targetQueue) {
    this.checks(value.id, targetQueue)
    return this.queues[targetQueue].enqueue(value)
  },
  dequeueItem(value, targetQueue) {
    this.checks(value, targetQueue)
    return this.queues[targetQueue].dequeue(value)
  },
  print() {
    return {
      'red': this.queues['red'].print(),
      'yellow': this.queues['yellow'].print(),
      'green': this.queues['green'].print()
    }
  }
}
