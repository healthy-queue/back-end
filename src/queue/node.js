'use strict'

class Node {
  constructor(value, next = null) {
    // Values should be unique either UUID or incremented INT
    this.value = value
    this.next = next
  }
}

module.exports = Node
