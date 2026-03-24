import { Task } from "../models/task";

// Node representing a single task
class TaskNode {
  task: Task;
  next: TaskNode | null;
  prev: TaskNode | null;

  constructor(
    task: Task,
    prev: TaskNode | null = null,
    next: TaskNode | null = null,
  ) {
    this.task = task;
    this.prev = prev;
    this.next = next;
  }
}

// Doubly linked list to manage tasks with efficient insert/delete operations
class DoublyLinkedList {
  head: TaskNode | null = null; // First node in the list
  tail: TaskNode | null = null; // Last node in the list

  // Adds a new task node at the end of the list
  append(task: Task) {
    const newNode = new TaskNode(task);

    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }

    newNode.prev = this.tail;
    this.tail!.next = newNode;
    this.tail = newNode;
  }

  // Finds a node by task ID by traversing the list
  findById(id: number): TaskNode | null {
    let curr = this.head;

    while (curr) {
      if (curr.task.id === id) return curr;
      curr = curr.next;
    }

    return null;
  }

  // Removes a node by ID and updates links accordingly
  removeById(id: number): Task | null {
    const node = this.findById(id);
    if (!node) return null;

    // Edge Case: Handle case when list has only one node
    if (node === this.head && node === this.tail) {
      this.head = this.tail = null;
    }

    // Remove head node
    if (node === this.head) {
      this.head = node.next;
      if (this.head) {
        this.head.prev = null; // Detach previous reference
      }
    }

    // Remove tail node
    else if (node === this.tail) {
      this.tail = node.prev;
      if (this.tail) {
        this.tail.next = null; // Detach next reference
      }
    }

    // Remove node from middle
    else {
      node.prev!.next = node.next; // Link previous node to next
      node.next!.prev = node.prev; // Link next node to previous
    }

    return node.task;
  }

  // Converts the linked list into an array of tasks
  toArray(): Task[] {
    const result: Task[] = [];
    let current = this.head;

    while (current) {
      result.push(current.task); // Collect tasks in order
      current = current.next;
    }

    return result;
  }

  // Rebuilds the linked list from an array of tasks
  fromArray(tasks: Task[]) {
    this.head = this.tail = null; // Reset current list

    for (const task of tasks) {
      this.append(task);  // Recreate list by appending each task
    }
  }
}

export { TaskNode, DoublyLinkedList };
