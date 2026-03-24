import { DoublyLinkedList, TaskNode } from "../data-structures/linkedList";
import { Task } from "../models/task";
import { FileHandler } from "./fileHandler";

class TaskManager {
  private fileHandler = new FileHandler();
  private tasks = new DoublyLinkedList();
  private nextId: number = 1;

  constructor() {
    const loadedTasks = this.fileHandler.loadTasks();

    let maxId = 0;

    for (const t of loadedTasks) {
      const task = new Task(t.id, t.title, t.isCompleted);
      this.tasks.append(task);

      if (t.id > maxId) maxId = t.id;
    }

    this.nextId = maxId + 1;
  }

  addNewTask(title: string): Task {
    const newTask = new Task(this.nextId, title, false);
    this.tasks.append(newTask);
    this.nextId++;

    this.fileHandler.saveTask(this.tasks.toArray());
    return newTask;
  }

  addTaskWithId(task: Task): void {
    this.tasks.append(task);

    if (task.id >= this.nextId) {
      this.nextId = task.id + 1;
    }

    this.fileHandler.saveTask(this.tasks.toArray());
  }

  updateTaskById(id: number, title: string): boolean {
    const node = this.tasks.findById(id);
    if (!node) return false;

    node.task = new Task(node.task.id, title, node.task.isCompleted);

    this.fileHandler.saveTask(this.tasks.toArray());
    return true;
  }

  deleteTaskById(id: number): Task | null {
    const deleted = this.tasks.removeById(id);

    if (deleted) {
      this.fileHandler.saveTask(this.tasks.toArray());
    }

    return deleted;
  }

  getAllTasks(): Task[] {
    return this.tasks.toArray();
  }

  completeTaskById(id: number): Task | null {
    const node = this.tasks.findById(id);
    if (!node) return null;

    node.task = new Task(node.task.id, node.task.title, true);

    this.fileHandler.saveTask(this.tasks.toArray());
    return node.task;
  }

  findTaskById(id: number): Task | null {
    const node = this.tasks.findById(id);
    return node ? node.task : null;
  }

  findNodeById(id: number) {
    return this.tasks.findById(id);
  }

  restoreTask(task: Task): void {
    const existing = this.tasks.findById(task.id);

    if (existing) {
      existing.task = task;
    } else {
      this.tasks.append(task);
    }

    this.fileHandler.saveTask(this.tasks.toArray());
  }

  insertAfter(prevId: number | null, task: Task): void {
    // Insert at head
    if (prevId === null) {
      const newNode = new TaskNode(task);

      if (!this.tasks.head) {
        this.tasks.head = this.tasks.tail = newNode;
      } else {
        newNode.next = this.tasks.head;
        this.tasks.head.prev = newNode;
        this.tasks.head = newNode;
      }

      this.fileHandler.saveTask(this.tasks.toArray());
      return;
    }

    const prevNode = this.tasks.findById(prevId);
    if (!prevNode) return;

    const newNode = new TaskNode(task);

    newNode.next = prevNode.next;
    newNode.prev = prevNode;

    if (prevNode.next) {
      prevNode.next.prev = newNode;
    } else {
      this.tasks.tail = newNode;
    }

    prevNode.next = newNode;

    this.fileHandler.saveTask(this.tasks.toArray());
  }

  clearAllTasks(): void {
    this.tasks = new DoublyLinkedList();
    this.fileHandler.saveTask([]);
  }

  setTasks(tasks: Task[]): void {
    this.tasks.fromArray(tasks);
    this.fileHandler.saveTask(this.tasks.toArray());
  }
}

export { TaskManager };
