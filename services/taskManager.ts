import { Task } from "../models/task";
import { FileHandler } from "./fileHandler";

// Manages tasks and states
class TaskManager {
  private fileHandler = new FileHandler();
  private tasks: Task[];
  private nextId: number;

  constructor() {
    this.tasks = this.fileHandler.loadTasks();

    let maxId = 0;
    for (const task of this.tasks) {
      if (task.id > maxId) {
        maxId = task.id;
      }
    }

    this.nextId = maxId + 1;
  }

  // Add new task and increments
  addTask(title: string): Task {
    const newTask = new Task(this.nextId, title, false);
    this.tasks.push(newTask);
    this.nextId++;

    this.fileHandler.saveTask(this.tasks);
    return newTask;
  }

  // Update task by Id
  updateTaskById(id: number, title: string): boolean {
    let found = false;

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        found = true;
        return new Task(task.id, title, task.isCompleted);
      }
      return task;
    });

    if (found) this.fileHandler.saveTask(this.tasks);

    return found;
  }

  // Delete task
  deleteTaskById(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);

    const success = this.tasks.length < initialLength;
    if (success) {
      this.fileHandler.saveTask(this.tasks);
    }

    return success;
  }

  // list all tasks
  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  // Complete task by Id
  completeTaskById(id: number): boolean {
    let found = false;

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        found = true;
        return new Task(task.id, task.title, true);
      }
      return task;
    });

    if (found) {
      this.fileHandler.saveTask(this.tasks);
    }

    return found;
  }

  // Find task by Id
  findTaskById(id: number) {
    return this.tasks.find((task) => task.id === id);
  }
}

export { TaskManager };
