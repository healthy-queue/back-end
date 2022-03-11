'use strict'

const Queue = require('./queue')

module.exports = {
  queues: {
    'red': new Queue(),
    'yellow': new Queue(),
    'green': new Queue(),
  },
  checks(id, targetQueue) {
    if(!id) throw new Error('No Id Provided')
    if(!targetQueue) throw new Error ('No Target Queue Provided')
    if(!Object.keys(this.queues).includes(targetQueue)) throw new Error('Not Valid Target Queue')
  },
  // Adds element to the end of the target queue
  changePriority(id, targetQueue, increasePriority) {
    this.checks(id, targetQueue)
    if(increasePriority === undefined) throw new Error('Should true or false to increase Priority')
    for(const i in this.queues) {
      for(const j of this.queues[i]) {
        if(j === id) {
          if(increasePriority) {
            this.queues[targetQueue].enqueue(id) // Add the item to the end of the queue
          } else {
            this.queues[targetQueue].addToFront(id) // Add the item to the front of the queue
          }
          this.queues[i].removeNode(id) // Remove the item from queue it was previously in
        }
      }
    }
  },
  enqueueItem(id, targetQueue) {
    this.checks(id, targetQueue)
    return this.queues[targetQueue].enqueue(id)
  },
  dequeueItem(id, targetQueue) {
    this.checks(id, targetQueue)
    return this.queues[targetQueue].dequeue(id)
  }
}
