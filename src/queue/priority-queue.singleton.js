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
  changePriority(id, targetQueue) {
    this.checks(id, targetQueue)
    if(this.queues['red'].length +  this.queues['yellow'].length + this.queues['green'].length === 0) {
      throw new Error('All Queues Empty')
    }
    let toTail
    for(const i in this.queues) {
      // Remove the item from queue it was previously in
      let result = this.queues[i].removeNode(id)
      /* 
        red -> yellow - toTail = true
        yellow -> green - toTail = true
        yellow -> red - toTail = false
        green -> any - toTail = false
      */
      if(result) {
        switch(i) {
        default: 
          toTail = true
          break
        case 'red':
          toTail = false
          break
        case 'yellow':
          toTail = targetQueue === 'red' ? true : false
          break
        case 'green':
          toTail = true
          break
        }
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
  dequeueItem() {
    let result = null
    if(this.queues['red'].head) {
      result = this.queues['red'].dequeue()
    } else if (this.queues['yellow'].head) {
      result = this.queues['yellow'].dequeue()
    } else if (this.queues['green'].head) {
      result = this.queues['green'].dequeue()
    }
    return result
  },
  print() {
    return {
      'red': this.queues['red'].print(),
      'yellow': this.queues['yellow'].print(),
      'green': this.queues['green'].print()
    }
  }
}
