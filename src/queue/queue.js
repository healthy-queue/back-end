const Node = require('./node')

class Queue {
  constructor(head = null, tail = null, length = 0) {
    this.head = head
    this.tail = tail
    this.length = length
  }

  // O(n)
  print() {
    let res = []
    let node = this.head
    while (node) {
      res.push(node.value)
      node = node.next
    }
    return res
  }

  // O(1)
  enqueue(value) {
    const temp = new Node(value)
    if (!this.head) {
      this.head = this.tail = temp
    } else {
      this.tail.next = temp
      this.tail = temp
    }
    this.length++
  }

  // O(1)
  dequeue() {
    // If queue is empty, return null.
    if (!this.head) return null

    // Store previous head and move one node ahead
    let temp = this.head
    this.head = this.head.next

    // If head is null, set rear to null
    if (!this.head) {
      this.tail = null
    }
    this.length--
    return temp.value
  }

  // O(1)
  addToFront(value) {
    if(!this.head){
      this.head = this.tail = new Node(value)
    } else {
      this.head = new Node(value, this.head)
    }
    this.length++
  }

  // O(n)
  removeNode(value) {
    if (value === undefined) throw new Error('Value Required')
    if (!this.head) return null // If nothing in queue return null
    let curr = this.head
    let prev = null
    let result = null
    while(curr) {
      // If node value is a match
      if(curr.value === value) {
        // Save value to result and decrement length
        result = curr.value
        this.length--

        // If it's the first node
        if(curr === this.head) {
          // If there's only one entry
          if(!this.head.next) {
            this.head = this.tail = null            
          } else {
            this.head = this.head.next
          }
        }

        // If it's the tail and not the head
        else if(curr === this.tail && curr !== this.head) {
          prev.next = null
          this.tail = prev
          curr = null
        }

        // If it's not the tail or the head
        else if(curr !== this.head && curr !== this.tail) {
          curr = curr.next
        }
      }
      // Keep track of previous node
      prev = curr
      // Next node if curr is still not null
      if(curr) curr = curr.next
    }
    return result
  }
}

module.exports = Queue
