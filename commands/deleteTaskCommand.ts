import { Task } from "../models/task";
import { TaskManager } from "../services/taskManager";
import { Command } from "./command";

// Command to delete a task
// Supports undo by storing the deleted task and restoring it if needed
class DeleteTaskCommand implements Command {
  private taskManager: TaskManager;
  private taskId: number;
  public deletedTask: Task | null = null;

  constructor(taskManager: TaskManager, taskId: number) {
    this.taskManager = taskManager;
    this.taskId = taskId;
  }

  // Executes the command: Deletes the task and stores it for undo
  execute(): void {
    this.deletedTask = this.taskManager.deleteTaskById(this.taskId);
  }

  // Undoes the command: Restores the previously deleted task if it exists
  undo(): void {
    if (this.deletedTask) {
      // Re-add the task with its original data (including ID)
      this.taskManager.addTaskWithId(this.deletedTask);
    }
  }
}

export { DeleteTaskCommand };
