'use strict';
/* Queues are nested in this object 
 {
   '2f6b878d-6c14-4ce3-b7ed-6bc2e553a686': {
     'red': [],
     'yellow': [],
     'green': []
   },
   {
    'bdf9617c-5944-4fa6-8d4e-684d26311ce3': {
      'red': {}
      'yellow': {}
      'green': {}
   }
   {
    'b91a0e78-e5f4-4b5e-a8a1-c92a692bf3ce': [{...}, {...}, {...}]
   }
 }

 // To remove the first item of our doubly linked list
 Use the reassign the head pointer to the node.next || null

 // To add an item to our doubly linked list
 Use the tail pointer assign to tail and reassign tail - O(1)

 // Reassign in a doubly linked list to adjust priority
 First we traverse the linked list to find our value based on UUID - O(n)
 Then We remove that node from the linked list - O(1)
 Then add add it to the end of the red linked list - 0(1)
 Then with a doubly linked list tail we can add it to the end - 0(1)
*/

module.exports = {};