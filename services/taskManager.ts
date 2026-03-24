import { DoublyLinkedList, TaskNode } from "../data-structures/linkedList";
import { Task } from "../models/task";
import { FileHandler } from "./fileHandler";

// Manages all task operations and persistence
class TaskManager {
  private fileHandler = new FileHandler(); // Handles reading/writing tasks to file
  private tasks = new DoublyLinkedList(); // Stores tasks in a doubly linked list
  private nextId: number = 1;

  constructor() {
    const loadedTasks = this.fileHandler.loadTasks(); // Load tasks from storage

    let maxId = 0;

    // Reconstruct tasks into linked list and find highest ID
    for (const t of loadedTasks) {
      const task = new Task(t.id, t.title, t.isCompleted);
      this.tasks.append(task);

      if (t.id > maxId) maxId = t.id;
    }

    // Ensure new tasks get a unique ID
    this.nextId = maxId + 1;
  }

  // Create and add a new task with auto-generated ID
  addNewTask(title: string): Task {
    const newTask = new Task(this.nextId, title, false);
    this.tasks.append(newTask);
    this.nextId++;

    this.fileHandler.saveTask(this.tasks.toArray()); // Persist changes
    return newTask;
  }

  // Add an existing task (used for restore/import scenarios)
  addTaskWithId(task: Task): void {
    this.tasks.append(task);

    // Update nextId if needed to avoid ID conflicts
    if (task.id >= this.nextId) {
      this.nextId = task.id + 1;
    }

    this.fileHandler.saveTask(this.tasks.toArray());
  }

  // Update the title of a task by ID
  updateTaskById(id: number, title: string): boolean {
    const node = this.tasks.findById(id);
    if (!node) return false;

    // Replace task object with updated title
    node.task = new Task(node.task.id, title, node.task.isCompleted);

    this.fileHandler.saveTask(this.tasks.toArray());
    return true;
  }

  // Delete a task by ID and return it
  deleteTaskById(id: number): Task | null {
    const deleted = this.tasks.removeById(id);

    // Only persist if something was actually deleted
    if (deleted) {
      this.fileHandler.saveTask(this.tasks.toArray());
    }

    return deleted;
  }

  // Get all tasks as an array
  getAllTasks(): Task[] {
    return this.tasks.toArray();
  }

  // Mark a task as completed
  completeTaskById(id: number): Task | null {
    const node = this.tasks.findById(id);
    if (!node) return null;

    // Replace task with completed version
    node.task = new Task(node.task.id, node.task.title, true);

    this.fileHandler.saveTask(this.tasks.toArray());
    return node.task;
  }

  // Find a task by ID (returns only the task, not the node)
  findTaskById(id: number): Task | null {
    const node = this.tasks.findById(id);
    return node ? node.task : null;
  }

  // Find the actual node
  findNodeById(id: number) {
    return this.tasks.findById(id);
  }

  // Restore a task (used for undo or recovery)
  restoreTask(task: Task): void {
    const existing = this.tasks.findById(task.id);

    if (existing) {
      // Replace existing task
      existing.task = task;
    } else {
      // Add if it doesn't exist
      this.tasks.append(task);
    }

    this.fileHandler.saveTask(this.tasks.toArray());
  }

  // Insert a task after a given task ID (or at head if prevId is null)
  insertAfter(prevId: number | null, task: Task): void {
    // Insert at head
    if (prevId === null) {
      const newNode = new TaskNode(task);

      // If list is empty, set both head and tail
      if (!this.tasks.head) {
        this.tasks.head = this.tasks.tail = newNode;
      } else {
        // Insert before current head
        newNode.next = this.tasks.head;
        this.tasks.head.prev = newNode;
        this.tasks.head = newNode;
      }

      this.fileHandler.saveTask(this.tasks.toArray());
      return;
    }

    const prevNode = this.tasks.findById(prevId);
    if (!prevNode) return; // Previous node not found

    const newNode = new TaskNode(task);

    // Link new node into the list
    newNode.next = prevNode.next;
    newNode.prev = prevNode;

    if (prevNode.next) {
      prevNode.next.prev = newNode;
    } else {
      // If inserting at the end, update tail
      this.tasks.tail = newNode;
    }

    prevNode.next = newNode;

    this.fileHandler.saveTask(this.tasks.toArray());
  }

  // Remove all tasks
  clearAllTasks(): void {
    this.tasks = new DoublyLinkedList(); // Reset list
    this.fileHandler.saveTask([]); // Persist empty state
  }

  // Replace entire task list
  setTasks(tasks: Task[]): void {
    this.tasks.fromArray(tasks);
    this.fileHandler.saveTask(this.tasks.toArray());
  }
}

export { TaskManager };
