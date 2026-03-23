import { Task } from "../models/task";
import { FileHandler } from "./fileHandler";

// Manages tasks and their state (in-memory + persistence)
class TaskManager {
  private fileHandler = new FileHandler();
  private tasks: Task[]; // In-memory list of tasks
  private nextId: number; // Tracks the next available ID for new tasks

  constructor() {
    // Load existing tasks from file
    this.tasks = this.fileHandler.loadTasks();

    // Find the highest existing ID to continue incrementing safely
    let maxId = 0;
    for (const task of this.tasks) {
      if (task.id > maxId) {
        maxId = task.id;
      }
    }

    this.nextId = maxId + 1;
  }

  // Add a new task with an auto-incremented ID
  addNewTask(title: string): Task {
    const newTask = new Task(this.nextId, title, false);
    this.tasks.push(newTask);
    this.nextId++;

    this.fileHandler.saveTask(this.tasks);
    return newTask;
  }

  // Add a task with a predefined ID (used for restore cases)
  addTaskWithId(task: Task): void {
    this.tasks.push(task);

    // keeping nextId in sync to avoid id collision
    if (task.id >= this.nextId) {
      this.nextId = task.id + 1;
    }

    // Persist changes
    this.fileHandler.saveTask(this.tasks);
  }

  // Update a task's title by ID
  updateTaskById(id: number, title: string): boolean {
    let found = false;

    // Replace the matching task with updated version
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        found = true;
        return new Task(task.id, title, task.isCompleted);
      }
      return task;
    });

    // Save only if a task was updated
    if (found) this.fileHandler.saveTask(this.tasks);

    return found;
  }

  // Delete a task by ID and return it
  deleteTaskById(id: number): Task | null {
    let deletedTask: Task | null = null;

    // Filter out the task to delete
    this.tasks = this.tasks.filter((task) => {
      if (task.id === id) {
        deletedTask = task; // capture deleted task
        return false;
      }
      return true;
    });

    // Save only if something was deleted
    if (deletedTask) {
      this.fileHandler.saveTask(this.tasks);
    }

    return deletedTask;
  }

  // Return a copy of all tasks (prevents external mutation)
  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  // Mark a task as completed by ID
  completeTaskById(id: number): Task | null {
    let completedTask: Task | null = null;

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        completedTask = task; // store old state
        return new Task(task.id, task.title, true); // mark complete
      }
      return task;
    });

     // Save only if task was found
    if (completedTask) {
      this.fileHandler.saveTask(this.tasks);
    }

    return completedTask;
  }

  // Find a task by Id
  findTaskById(id: number) {
    return this.tasks.find((task) => task.id === id);
  }

   // Restore a task (used for undo functionality)
  restoreTask(task: Task): void {
    let found = false;

    // Replace task if it exists
    this.tasks = this.tasks.map((t) => {
      if (t.id === task.id) {
        found = true;
        return task; // restore full previous state
      }
      return t;
    });

    // If task doesn't exist, re-add it
    if (!found) {
      this.tasks.push(task);

      // keep nextId correct
      if (task.id >= this.nextId) {
        this.nextId = task.id + 1;
      }
    }

    this.fileHandler.saveTask(this.tasks);
  }

  // Clear task list
  clearAllTasks(): void {
    // Clear the in memory
    this.tasks = [];

    // clear the JSON file
    this.fileHandler.saveTask(this.tasks);
  }

  // set task
  setTasks(tasks: any[]): void {
    this.tasks = tasks;
  }
}

export { TaskManager };
