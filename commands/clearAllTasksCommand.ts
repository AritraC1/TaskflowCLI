import { Command } from "./command";
import { TaskManager } from "../services/taskManager";

// Command to clear all tasks.
// Supports undo by backing up the current state before clearing.
class ClearAllTasksCommand implements Command {
  // Stores a backup of all tasks before they are cleared
  private backup: any[] = [];
  private taskManager: TaskManager;

  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
  }

  // Executes the command: Saves the current list of tasks and Clears all tasks from the manager
  execute(): void {
    this.backup = [...this.taskManager.getAllTasks()]; // Shallow copy
    this.taskManager.clearAllTasks();
  }

  // Undoes the command: Restores the previously saved task list
  undo(): void {
    this.taskManager.setTasks(this.backup);
  }
}

export { ClearAllTasksCommand };
