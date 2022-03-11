'use strict'

const Queue = require('./queue')

module.exports = {
  queues: {
    'red': new Queue(),
    'yellow': new Queue(),
    'green': new Queue(),
  },
  checks(value, targetQueue) {
    if(!value.id) throw new Error('No Id Provided')
    if(!targetQueue) throw new Error ('No Target Queue Provided')
    if(!Object.keys(this.queues).includes(targetQueue)) throw new Error('Not Valid Target Queue')
  },
  // Adds element to the end of the target queue
  changePriority(id, targetQueue, increasePriority) {
    this.checks(value, targetQueue)
    if(increasePriority === undefined) throw new Error('Should true or false to increase Priority')
    for(const i in this.queues) {
      for(const j of this.queues[i]) {
        if(j.id === id) {
          if(increasePriority) {
            this.queues[targetQueue].enqueue(j) // Add the item to the end of the queue
          } else {
            this.queues[targetQueue].addToFront(j) // Add the item to the front of the queue
          }
          this.queues[i].removeNode(id) // Remove the item from queue it was previously in
        }
      }
    }
  },
  enqueueItem(value, targetQueue) {
    this.checks(value, targetQueue)
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
