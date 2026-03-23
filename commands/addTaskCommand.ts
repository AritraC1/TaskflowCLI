import { Task } from "../models/task";
import { TaskManager } from "../services/taskManager";
import { Command } from "./command";

// Command to add a new task
// Implements the Command pattern to support execute and undo operations.
class AddTaskCommand implements Command {
  private taskManager: TaskManager;
  private title: string;
  public createdTask: Task | null = null;

  // Initializes the command with required dependencies
  constructor(taskManager: TaskManager, title: string) {
    this.taskManager = taskManager;
    this.title = title;
  }

  // Executes the command: Creates a new task using TaskManager and stores it
  execute(): void {
    this.createdTask = this.taskManager.addNewTask(this.title);
  }

  // Undoes the command: Deletes the previously created task if it exists
  undo(): void {
    if (this.createdTask !== null) {
      this.taskManager.deleteTaskById(this.createdTask.id);
    }
  }
}

export { AddTaskCommand };
