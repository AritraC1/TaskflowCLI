import { Task } from "../models/task";
import { TaskManager } from "../services/taskManager";
import { Command } from "./command";

// Command to mark a task as completed
// Supports undo by restoring the task to its previous state.
class CompleteTaskCommand implements Command {
  private taskManager: TaskManager;
  private taskId: number;
  public completedTask: Task | null = null;
  private afterTask: Task | null = null;

  constructor(taskManager: TaskManager, taskId: number) {
    this.taskId = taskId;
    this.taskManager = taskManager;
  }

  // Executes the command: Marks the task as completed and stores it for undo
  execute(): void {
    const task = this.taskManager.findTaskById(this.taskId);

    if (!task) return;

    // Store snapshot of task BEFORE completing
    this.completedTask = new Task(task.id, task.title, task.isCompleted);
    this.afterTask = new Task(task.id, task.title, true);

    this.taskManager.restoreTask(this.afterTask);
  }

  // Undoes the command: Restores the previously completed task if it exists
  undo(): void {
    if (!this.completedTask) return;

    this.taskManager.restoreTask(this.completedTask);
  }
}

export { CompleteTaskCommand };
