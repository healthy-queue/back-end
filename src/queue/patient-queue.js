class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  print() {
    let res = []
    let c = this.head
    while (c) {
      res.push(c.value)
      c = c.next
    }
    return res
  }
  enqueue(value) {
    const newPatient = new Node(value)
    if (!this.head) {
      this.head = newPatient
      this.tail = newPatient
      this.length++
    } else {
      this.tail.next = newPatient
      this.tail = newPatient
      this.length++
    }
  }
  dequeue() {
    if (!this.head) return null
    else {
      let temp = this.head
      if (this.head === this.tail) this.tail = null
      this.head = temp.next
      temp.next = null
      this.length--
      return temp
    }
  }
}

const red = new Queue();
const yellow = new Queue();
const green = new Queue();

const healthyQueue = {
  red,
  yellow,
  green
}

module.exports = healthyQueue
